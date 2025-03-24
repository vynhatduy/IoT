using Microsoft.AspNetCore.SignalR;

namespace IoT_Farm.Services
{
    public class MyHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
