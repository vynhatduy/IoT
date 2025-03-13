using IoT_Farm.Models.Request;
using IoT_Farm.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IoT_Farm.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }
        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _service.GetAllAsync();
            if (!result.Any())
                return NotFound("No users found");

            return Ok(result);
        }
        [HttpGet("byId")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null)
                return NotFound("Not found");

            return Ok(result);
        }
        [HttpGet("byUsername")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserByUsermane(string username)
        {
            var result = await _service.GetByUsernameAsync(username);
            if (result == null)
                return NotFound("Not found");

            return Ok(result);
        }
        [HttpPost("user/create")]
        public async Task<IActionResult> CreateUser(UserRequestModel model)
        {
            var result = await _service.CreateUserAsync(model);
            return result.Status ? Ok(result) : BadRequest(result);
        }
        [HttpPost("admin/create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateAdmin(UserRequestModel model)
        {
            var result = await _service.CreateAdminAsync(model);
            return result.Status ? Ok(result) : BadRequest(result);
        }
        [HttpPut("update")]
        [Authorize]
        public async Task<IActionResult> Update(string id, UserRequestModel model)
        {
            var result = await _service.UpdateAsync(id, model);
            return result.Status ? Ok(result) : BadRequest(result);
        }
        [HttpDelete("delete")]
        [Authorize]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _service.DeleteAsync(id);
            return result.Status ? Ok(result) : BadRequest(result);
        }
    }
}