using IoT_Farm.Datas;
using IoT_Farm.Models.Request;

namespace IoT_Farm.Services.Interface
{
    public interface IDeviceControlService
    {
        Task SendCommandAsync(DeviceRequestModel model);
        Task SaveCommandAsync(DeviceCommand command);
        Task<List<DeviceCommand>> GetCommandHistoryAsync(string deviceId);
        Task HandleDeviceResponse(string topic, string payload);
    }
}
