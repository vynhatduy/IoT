using IoT_Farm.Models.Request;
using IoT_Farm.Services.Interface;
using Microsoft.AspNetCore.SignalR;

namespace IoT_Farm.Services
{
    public class MyHub : Hub
    {
        private readonly IDeviceControlService _deviceService;

        public MyHub(IDeviceControlService deviceService)
        {
            _deviceService = deviceService;
        }

        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
        public async Task ControlDevice(HubDeviceRequestModel model)
        {
            var response = _deviceService.ControlDevice(model);
            await Clients.All.SendAsync("control-device-update", response);
        }
    }
}
