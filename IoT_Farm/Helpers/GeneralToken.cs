using DotNetEnv;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IoT_Farm.Helpers
{
    public class GeneralToken
    {
        public static string GenerateJwtToken(string username, string role)
        {
            var secretKey = Encoding.UTF8.GetBytes(Env.GetString("JWT_SecretKey"));
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub,username),
                new Claim(ClaimTypes.Role,role),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };
            var key = new SymmetricSecurityKey(secretKey);
            var creds = new SigningCredentials(key, SecurityAlgorithms.RsaSha512);

            var token = new JwtSecurityToken(
                issuer: Env.GetString("JWT_Issuer"),
                audience: Env.GetString("JWT_Audience"),
                expires: DateTime.Now.AddHours(2),
                claims: claims,
                signingCredentials: creds
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);

        }
    }
}