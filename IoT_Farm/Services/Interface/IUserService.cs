using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;

namespace IoT_Farm.Services.Interface
{
    public interface IUserService
    {
        Task<List<UserResponseModel>> GetAllAsync();
        Task<UserResponseModel> GetByIdAsync(string id);
        Task<UserResponseModel> GetByUsernameAsync(string username);
        Task<ResultModel> CreateUserAsync(UserRequestModel model);
        Task<ResultModel> CreateAdminAsync(UserRequestModel model);
        Task<ResultModel> UpdateAsync(string id, UserRequestModel model);
        Task<ResultModel> DeleteAsync(string id);
        Task<ResultModel> Login(LoginRequestModel model);
        Task<ResultModel> RefreshToken(string accessToken, string refreshToken);

    }
}
