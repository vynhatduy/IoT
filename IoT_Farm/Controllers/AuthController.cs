using IoT_Farm.Services.Token;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IoT_Farm.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TokenBlacklistService _blacklistService;

        public AuthController(TokenBlacklistService blacklistService)
        {
            _blacklistService = blacklistService;
        }
        //[HttpPost("login")]
        //public Task<IActionResult> Login(LoginRequestModel model)
        //{

        //}
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (token == null)
            {
                return BadRequest("Token không hợp lệ.");
            }

            await _blacklistService.AddToBlacklist(token);
            return Ok(new { message = "Bạn đã đăng xuất. Token đã bị thu hồi!" });
        }
    }
}
