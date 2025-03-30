namespace IoT_Farm.Services.Token
{
    public class TokenBlacklistService
    {
        private static readonly HashSet<string> _blacklistedTokens = new();
        public Task<bool> IsTokenBlacklisted(string token)
        {
            return Task.FromResult(_blacklistedTokens.Contains(token));
        }

        public Task AddToBlacklist(string token)
        {
            _blacklistedTokens.Add(token);
            return Task.CompletedTask;
        }
    }
}
