using IoT_Farm.Datas;

namespace IoT_Farm.Repositories.Interface
{
    public interface IDeviceControlRepository : IGenericRepository<DeviceCommand>
    {
        Task SaveCommandAsync(DeviceCommand command);
        Task<List<DeviceCommand>> GetCommandHistoryAsync(string deviceId);
        Task<DeviceCommand> GetCommandHistoryLatestAsync(string deviceId);
    }
}
