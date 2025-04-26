using IoT_Farm.Datas;

namespace IoT_Farm.Repositories.Interface
{
    public interface IDeviceScheduleRepository : IGenericRepository<DeviceScheduleLastSent>
    {
        Task<DeviceScheduleLastSent?> GetLastSentAsync(string device, string area, string type);
        Task<bool> UpdateLastSentAsync(string device, string area, string type, DateTime lastSent);
    }
}
