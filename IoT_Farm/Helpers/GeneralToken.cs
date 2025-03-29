using DotNetEnv;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace IoT_Farm.Helpers
{
    public class GeneralToken
    {
        public static string GenerateJwtToken(string username, string role)
        {
            var secretKey = Convert.FromBase64String(Env.GetString("JWT_SecretKey"));
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub,username),
                new Claim(ClaimTypes.Role,role),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };
            var key = new SymmetricSecurityKey(secretKey);
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                issuer: Env.GetString("JWT_Issuer"),
                audience: Env.GetString("JWT_Audience"),
                expires: DateTime.Now.AddHours(2),
                claims: claims,
                signingCredentials: creds
            );

            try
            {
                var jwtSecretKey = Convert.FromBase64String(Env.GetString("JWT_SecretKey"));
                Console.WriteLine($"Secret Key Length: {Env.GetString("JWT_SecretKey")}");
                Console.WriteLine($"Secret Key: {jwtSecretKey.Length}");

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Invalid Base64 Key: {ex.Message}");
            }


            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);

        }
    }
}