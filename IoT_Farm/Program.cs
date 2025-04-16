using DotNetEnv;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Implement;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services;
using IoT_Farm.Services.Implement;
using IoT_Farm.Services.Interface;
using IoT_Farm.Services.MQTT;
using IoT_Farm.Services.Token;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables
Env.Load();

// Get configuration values from environment variables
var databaseName = Env.GetString("DatabaseName") ?? "IoT_Farm";
var sqlConnection = Env.GetString("SQLConnection") ?? "your-default-sql-connection";
var mongoConnection = Env.GetString("MongoDBConnection") ?? "mongodb://localhost:27017";
var dbType = Env.GetString("DatabaseType") ?? "mongo";

// Create MongoDB connection
var mongoClient = new MongoClient(mongoConnection);
var mongoDatabase = mongoClient.GetDatabase(databaseName);

// Register MongoDB Client if using Mongo
if (dbType == "mongo")
{
    builder.Services.AddSingleton<IMongoClient>(sp => new MongoClient(mongoConnection));
    builder.Services.AddScoped(sp =>
    {
        var client = sp.GetRequiredService<IMongoClient>();
        return client.GetDatabase(databaseName);
    });
}

// Register DatabaseAdapterFactory
builder.Services.AddSingleton(new DatabaseAdapterFactory(mongoDatabase, sqlConnection, dbType));

// Register IDatabaseAdapter<> as Open Generic
builder.Services.AddScoped(typeof(IDatabaseAdapter<>), typeof(MongoDbAdapter<>));
builder.Services.AddScoped(typeof(IDatabaseAdapter<>), typeof(SqlDbAdapter<>));

// Register other services
builder.Services.AddSingleton<TokenBlacklistService>();
builder.Services.AddScoped<IEnvironmentRepository, EnvironmentRepository>();
builder.Services.AddScoped<IEnvironmentService, EnvironmentService>();

builder.Services.AddScoped<IAreaRepository, AreaRepository>();
builder.Services.AddScoped<IAreaService, AreaService>();

builder.Services.AddScoped<EnvironmentDataAdapter>();

// Try to register MQTT Service, but catch any errors
try
{
    builder.Services.AddSingleton<IMQTTService, MQTTService>();
    builder.Services.AddHostedService<MQTTService>();
    Console.WriteLine("✅ MQTT Service initialized successfully.");
}
catch (Exception ex)
{
    Console.WriteLine($"⚠️ Warning: MQTT Service failed to start. Error: {ex.Message}");
}

// Configure JWT
var secretKey = Convert.FromBase64String(Env.GetString("JWT_SecretKey"));
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
            IssuerSigningKey = new SymmetricSecurityKey(secretKey),
            ClockSkew = TimeSpan.Zero

        };
    });

builder.Services.AddAuthorization();

// Register repository and service
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IJwtService, JwtService>();

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();


builder.Services.AddScoped<IDeviceControlRepository, DeviceControlRepository>();
builder.Services.AddScoped<IDeviceControlService, DeviceControlService>();

builder.Services.AddScoped<IAreaDeviceRepository, AreaDeviceRepository>();
builder.Services.AddScoped<IAreaDeviceService, AreaDeviceService>();
// Add AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// Register API Controller and Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var FE_URL = Env.GetString("FE_URL");

builder.Services.AddSignalR();
builder.Services.AddCors(otp =>
{
    otp.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(FE_URL)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
    otp.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader());
});

// login bear token in swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "IoT Farm API",
        Version = "v1"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        In = ParameterLocation.Header,
        Description = "Nhập token theo format: Bearer {your_token}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference=new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});


// Build the app
var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<BlacklistMiddleware>();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<MyHub>("/ws");
});

app.UseSwagger();
app.UseSwaggerUI();

app.Run();
