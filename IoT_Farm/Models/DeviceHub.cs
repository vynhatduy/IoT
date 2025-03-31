using Microsoft.AspNetCore.SignalR;

namespace IoT_Farm.Models
{
    public class DeviceHub : Hub
    {
        public async Task SendStatusUpdate(string deviceId, string status)
        {
            await Clients.All.SendAsync("ReceiveDeviceStatus", new { deviceId, status });
        }
    }
}
