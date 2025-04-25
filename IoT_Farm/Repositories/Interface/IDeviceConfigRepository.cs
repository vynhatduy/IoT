using IoT_Farm.Datas;
using IoT_Farm.Models.Response;

namespace IoT_Farm.Repositories.Interface
{
    public interface IDeviceConfigRepository : IGenericRepository<DeviceConfigWeather>
    {
        Task<List<DeviceConfigWeather>> GetAllDeviceConfigAsync();
        Task<List<DeviceConfigWeather>> GetByAreaAsync(string area);
        Task<List<DeviceConfigWeather>> GetByStatusAsync(bool status);
        Task<ResultModel> CreateDeviceConfigAsync(DeviceConfigWeather model);
        Task<ResultModel> UpdateDeviceConfigAsync(string id, DeviceConfigWeather model);
        Task<ResultModel> DeleteDeviceConfigAsync(string id);
    }
}
