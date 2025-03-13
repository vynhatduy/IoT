using DotNetEnv;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Implement;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Implement;
using IoT_Farm.Services.Interface;
using IoT_Farm.Services.MQTT;
using IoT_Farm.Services.Token;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Load biến môi trường
Env.Load();

// Lấy giá trị cấu hình từ biến môi trường
var databaseName = Env.GetString("DatabaseName") ?? "IoT_Farm";
var sqlConnection = Env.GetString("SQLConnection") ?? "your-default-sql-connection";
var mongoConnection = Env.GetString("MongoDBConnection") ?? "mongodb://localhost:27017";
var dbType = Env.GetString("DatabaseType") ?? "mongo";

// Tạo kết nối MongoDB
var mongoClient = new MongoClient(mongoConnection);
var mongoDatabase = mongoClient.GetDatabase(databaseName);

// Đăng ký MongoDB Client nếu dùng Mongo
if (dbType == "mongo")
{
    builder.Services.AddSingleton<IMongoClient>(sp => new MongoClient(mongoConnection));
    builder.Services.AddScoped(sp =>
    {
        var client = sp.GetRequiredService<IMongoClient>();
        return client.GetDatabase(databaseName);
    });
}

// Đăng ký DatabaseAdapterFactory
builder.Services.AddSingleton(new DatabaseAdapterFactory(mongoDatabase, sqlConnection, dbType));

// Đăng ký IDatabaseAdapter<> theo cách Open Generic
builder.Services.AddScoped(typeof(IDatabaseAdapter<>), typeof(MongoDbAdapter<>));
builder.Services.AddScoped(typeof(IDatabaseAdapter<>), typeof(SqlDbAdapter<>));

// Đăng ký các service khác
builder.Services.AddSingleton<TokenBlacklistService>();
builder.Services.AddSingleton<IMQTTService, MQTTService>();
builder.Services.AddHostedService<MQTTService>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddSingleton<IEnvironmentRepository, EnvironmentRepository>();
builder.Services.AddSingleton<IEnvironmentService, EnvironmentService>();
// Cấu hình JWT
var jwtSecretKey = Encoding.UTF8.GetBytes(Env.GetString("JWT_SecretKey"));
var issuer = Env.GetString("JWT_Issuer");
var audience = Env.GetString("JWT_Audience");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(jwtSecretKey)
        };
    });

builder.Services.AddAuthorization();

// Đăng ký repository và service
builder.Services.AddScoped(typeof(GenericRepository<>));
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

// Thêm AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// Đăng ký API Controller và Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Tạo app
var app = builder.Build();

// Cấu hình middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<BlacklistMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Chạy ứng dụng
app.Run();
