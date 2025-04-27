namespace IoT_Farm.Services.Token
{
    public class BlacklistMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly TokenBlacklistService _blacklistService;

        public BlacklistMiddleware(RequestDelegate next, TokenBlacklistService blacklistService)
        {
            _next = next;
            _blacklistService = blacklistService;
        }
        public async Task Invoke(HttpContext context)
        {
            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
            if (authHeader != null && authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring("Bearer ".Length).Trim();
                if (await _blacklistService.IsTokenBlacklisted(token))
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Token has been revoked.");
                    return;
                }
            }
            await _next(context);
        }
    }
}
