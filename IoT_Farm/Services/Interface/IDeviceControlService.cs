using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;

namespace IoT_Farm.Services.Interface
{
    public interface IDeviceControlService
    {
        Task<ResultModel> SendCommandAsync(DeviceRequestModel model);
        Task ControlDevice(HubDeviceRequestModel model);
        Task SaveCommandAsync(DeviceCommand command);
        Task<List<DeviceCommand>> GetCommandHistoryAsync(string deviceId);
        Task HandleDeviceResponse(string topic, string payload);
        Task<DeviceCommand> GetCommandHistoryLatestAsync(string deviceId);
    }
}
