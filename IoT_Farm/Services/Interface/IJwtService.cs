using System.Security.Claims;

namespace IoT_Farm.Services.Interface
{
    public interface IJwtService
    {
        string GenerateAccessToken(IEnumerable<Claim> claims);
        string GenerateRefreshToken();
        ClaimsPrincipal? ValidateToken(string token);
    }
}
