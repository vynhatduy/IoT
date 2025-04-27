using IoT_Farm.Models.Request;
using IoT_Farm.Services.Interface;
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
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;

        public AuthController(TokenBlacklistService blacklistService, IUserService userService, IJwtService jwtService)
        {
            _blacklistService = blacklistService;
            _userService = userService;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestModel model)
        {
            var result = await _userService.Login(model);
            return result.Status ? Ok(result) : BadRequest(result);
        }

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

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequestModel tokenRequest)
        {
            if (tokenRequest == null || string.IsNullOrEmpty(tokenRequest.AccessToken) || string.IsNullOrEmpty(tokenRequest.RefreshToken))
            {
                return BadRequest("Yêu cầu không hợp lệ.");
            }

            var result = await _userService.RefreshToken(tokenRequest.AccessToken, tokenRequest.RefreshToken);
            return result.Status ? Ok(result) : Unauthorized(result);
        }
    }
}
