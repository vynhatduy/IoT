using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;

namespace IoT_Farm.Services.Interface
{
    public interface IWeatherDeviceConfigService
    {
        Task<List<DeviceConfigWeather>> GetAllAsync();
        Task<List<DeviceConfigWeather>> GetByAreaAsync(string area);
        Task<List<DeviceConfigWeather>> GetByStatusAsync(bool status);
        Task<ResultModel> CreateAsync(WeatherConfigDeviceRequestModel model);
        Task<ResultModel> UpdateAsync(string id, DeviceConfigWeather model);
        Task<ResultModel> DeleteAsync(string id);
    }
}
