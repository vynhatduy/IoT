namespace IoT_Farm.Helpers
{
    public class Hasher
    {
        public static string HashPasswordHash(string PasswordHash)
        {
            return BCrypt.Net.BCrypt.HashPassword(PasswordHash);
        }

        public static bool VerifyPasswordHash(string PasswordHash, string hashedPasswordHash)
        {
            return BCrypt.Net.BCrypt.Verify(PasswordHash, hashedPasswordHash);
        }
    }
}
