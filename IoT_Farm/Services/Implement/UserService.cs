using AutoMapper;
using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Implement;
using IoT_Farm.Services.Interface;

namespace IoT_Farm.Services.Implement
{
    public class UserService : IUserService
    {
        private readonly UserRepository _repo;
        private readonly IMapper _mapper;

        public UserService(UserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<bool> IsValidUsername(string username) =>
            (await _repo.GetByUsernameAsync(username)) == null;
        private async Task<ResultModel> CreateUserWithRoleAsync(UserRequestModel model, string role)
        {
            if (!await IsValidUsername(model.PhoneNumber))
            {
                return new ResultModel
                {
                    Status = false,
                    Data = null,
                    Message = "Phone number already exists"
                };
            }

            if (!await IsValidUsername(model.Email))
            {
                return new ResultModel
                {
                    Status = false,
                    Data = null,
                    Message = "Email already exists"
                };
            }
            var user = new User
            {
                Address = model.Address,
                CreatedAt = DateTime.Now,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber,
                Role = role
            };

            user.SetPasswordHash(model.Password);
            await _repo.AddAsync(user);

            return new ResultModel
            {
                Status = true,
                Data = user,
                Message = "User created successfully"
            };
        }
        public async Task<ResultModel> CreateUserAsync(UserRequestModel model) =>
            await CreateUserWithRoleAsync(model, "User");

        public async Task<ResultModel> CreateAdminAsync(UserRequestModel model) =>
            await CreateUserWithRoleAsync(model, "Admin");

        public async Task<ResultModel> DeleteAsync(string id)
        {
            var existingUser = await _repo.GetByIdAsync(id);
            if (existingUser == null)
            {
                return new ResultModel
                {
                    Status = false,
                    Data = null,
                    Message = "User not found"
                };
            }

            var success = await _repo.DeleteAsync(id);
            if (!success)
            {
                return new ResultModel
                {
                    Status = false,
                    Data = null,
                    Message = "User deletion failed"
                };
            }

            return new ResultModel
            {
                Status = true,
                Data = _mapper.Map<UserResponseModel>(existingUser),
                Message = "User deleted successfully"
            };
        }

        public async Task<UserResponseModel> GetByIdAsync(string id)
        {
            var result = await _repo.GetByIdAsync(id);
            if (result == null)
            {
                throw new KeyNotFoundException("User not found");
            }
            return _mapper.Map<UserResponseModel>(result);
        }

        public async Task<UserResponseModel> GetByUsernameAsync(string username)
        {
            var result = await _repo.GetByUsernameAsync(username);
            if (result == null)
            {
                throw new KeyNotFoundException("User not found");
            }
            return _mapper.Map<UserResponseModel>(result);
        }

        public async Task<ResultModel> UpdateAsync(string id, UserRequestModel model)
        {
            var existingUser = await _repo.GetByIdAsync(id);
            if (existingUser == null)
            {
                return new ResultModel
                {
                    Status = false,
                    Data = null,
                    Message = "User not found"
                };
            }

            var updateUser = _mapper.Map(model, existingUser);
            updateUser.SetPasswordHash(model.Password);
            updateUser.UpdatedAt = DateTime.UtcNow;

            var success = await _repo.UpdateAsync(id, updateUser);
            if (!success)
            {
                return new ResultModel
                {
                    Status = false,
                    Data = null,
                    Message = "User update failed"
                };
            }

            return new ResultModel
            {
                Status = true,
                Data = _mapper.Map<UserResponseModel>(updateUser),
                Message = "User updated successfully"
            };
        }

        public async Task<List<UserResponseModel>> GetAllAsync()
        {
            var result = await _repo.GetAllAsync();
            return _mapper.Map<List<UserResponseModel>>(result);
        }
    }
}
