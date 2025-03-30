using AutoMapper;
using IoT_Farm.Datas;
using IoT_Farm.Helpers;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Implement;
using IoT_Farm.Services.Interface;
using System.Security.Claims;

namespace IoT_Farm.Services.Implement
{
    public class UserService : IUserService
    {
        private readonly UserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IJwtService _jwtService;
        private readonly HttpContext _httpContext;

        public UserService(UserRepository repo, IMapper mapper, IJwtService jwtService, IHttpContextAccessor httpContextAccessor)
        {
            _repo = repo;
            _mapper = mapper;
            _jwtService = jwtService;
            _httpContext = httpContextAccessor.HttpContext;
        }

        public async Task<bool> IsValidUsername(string username) => await _repo.GetByUsernameAsync(username) == null;

        private async Task<ResultModel> CreateUserWithRoleAsync(UserRequestModel model, string role)
        {
            if (!await IsValidUsername(model.PhoneNumber) || !await IsValidUsername(model.Email))
            {
                return ResultModel.Fail("Phone number or Email already exists");
            }

            var user = new User
            {
                Address = model.Address,
                CreatedAt = DateTime.UtcNow,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber,
                Role = role
            };

            user.SetPasswordHash(model.Password);
            await _repo.AddAsync(user);

            return ResultModel.Success("User created successfully", user);
        }

        public Task<ResultModel> CreateUserAsync(UserRequestModel model) => CreateUserWithRoleAsync(model, "User");
        public Task<ResultModel> CreateAdminAsync(UserRequestModel model) => CreateUserWithRoleAsync(model, "Admin");

        public async Task<ResultModel> DeleteAsync(string id)
        {
            var existingUser = await _repo.GetByIdAsync(id);
            if (existingUser == null) return ResultModel.Fail("User not found");

            return await _repo.DeleteAsync(id)
                ? ResultModel.Success("User deleted successfully", _mapper.Map<UserResponseModel>(existingUser))
                : ResultModel.Fail("User deletion failed");
        }

        public async Task<UserResponseModel> GetByIdAsync(string id) =>
            _mapper.Map<UserResponseModel>(await _repo.GetByIdAsync(id) ?? throw new KeyNotFoundException("User not found"));

        public async Task<UserResponseModel> GetByUsernameAsync(string username) =>
            _mapper.Map<UserResponseModel>(await _repo.GetByUsernameAsync(username) ?? throw new KeyNotFoundException("User not found"));

        public async Task<ResultModel> UpdateAsync(string id, UserRequestModel model)
        {
            var existingUser = await _repo.GetByIdAsync(id);
            if (existingUser == null) return ResultModel.Fail("User not found");

            _mapper.Map(model, existingUser);
            existingUser.SetPasswordHash(model.Password);
            existingUser.UpdatedAt = DateTime.UtcNow;

            return await _repo.UpdateAsync(id, existingUser)
                ? ResultModel.Success("User updated successfully", _mapper.Map<UserResponseModel>(existingUser))
                : ResultModel.Fail("User update failed");
        }

        public async Task<List<UserResponseModel>> GetAllAsync() =>
            _mapper.Map<List<UserResponseModel>>(await _repo.GetAllAsync());

        public async Task<ResultModel> Login(LoginRequestModel model)
        {
            var user = await _repo.GetByUsernameAsync(model.Username.Trim());
            if (user == null || !Hasher.VerifyPasswordHash(model.Password.Trim(), user.PasswordHash.Trim()))
            {
                return ResultModel.Fail("Tên đăng nhập hoặc mật khẩu không đúng");
            }

            var tokens = GenerateTokens(user);
            user.RefreshTokens.Add(tokens.RefreshToken);
            await _repo.UpdateRefreshTokenAsync(user.Id, tokens.RefreshToken);

            return ResultModel.Success("Đăng nhập thành công", tokens);
        }

        public async Task<ResultModel> RefreshToken(string accessToken, string refreshToken)
        {
            var principal = _jwtService.ValidateToken(accessToken);
            if (principal == null) return ResultModel.Fail("Token không hợp lệ");

            var userId = principal.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var user = await _repo.GetUserById(userId!);
            if (user == null) return ResultModel.Fail("Người dùng không tồn tại");

            var storedToken = user.RefreshTokens.FirstOrDefault(t => t.Token == refreshToken);
            if (storedToken == null || !storedToken.IsActive)
            {
                return ResultModel.Fail("Refresh Token không hợp lệ hoặc đã hết hạn");
            }

            storedToken.Revoked = DateTime.UtcNow;
            storedToken.RevokedByIp = GetClientIp();
            var tokens = GenerateTokens(user);

            user.RefreshTokens.Add(tokens.RefreshToken);
            await _repo.UpdateAsync(user.Id, user);

            return ResultModel.Success("Refresh Token thành công", tokens);
        }

        private TokenResponseModel GenerateTokens(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("UserId", user.Id)
            };

            return new TokenResponseModel
            {
                AccessToken = _jwtService.GenerateAccessToken(claims),
                RefreshToken = new RefreshToken
                {
                    Token = _jwtService.GenerateRefreshToken(),
                    Expires = DateTime.UtcNow.AddDays(7),
                    Created = DateTime.UtcNow,
                    CreatedByIp = GetClientIp()
                }
            };
        }

        private string GetClientIp() => _httpContext?.Connection?.RemoteIpAddress?.ToString() ?? "Unknown";
    }
}
