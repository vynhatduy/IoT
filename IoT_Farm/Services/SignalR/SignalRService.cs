

using Microsoft.AspNetCore.SignalR;

namespace IoT_Farm.Services.SignalR
{
    public class SignalRService<T> : ISignalRService<T>
    {
        private readonly IHubContext<AppHub> _hubContext;

        public SignalRService(IHubContext<AppHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task SendMessageToAllAsync(string method, T message)
        {
            await _hubContext.Clients.All.SendAsync(method, message);
        }

        public async Task SendMessageToGroupAsync(string groupName, string method, T message)
        {
            await _hubContext.Clients.Group(groupName).SendAsync(method, message);
        }

        public async Task SendMessageToUserAsync(string userId, string method, T message)
        {
            await _hubContext.Clients.Client(userId).SendAsync(method, message);
        }
    }
}
