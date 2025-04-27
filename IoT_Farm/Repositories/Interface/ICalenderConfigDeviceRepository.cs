using IoT_Farm.Datas;
using IoT_Farm.Models.Response;

namespace IoT_Farm.Repositories.Interface
{
    public interface ICalenderConfigDeviceRepository : IGenericRepository<CalenderDeviceConfig>
    {
        Task<List<CalenderDeviceConfig>> GetAllDeviceConfigAsync();
        Task<List<CalenderDeviceConfig>> GetByAreaAsync(string area);
        Task<List<CalenderDeviceConfig>> GetByStatusAsync(bool status);
        Task<ResultModel> CreateDeviceConfigAsync(CalenderDeviceConfig model);
        Task<ResultModel> UpdateDeviceConfigAsync(string id, CalenderDeviceConfig model);
        Task<ResultModel> DeleteDeviceConfigAsync(string id);
        Task<List<CalenderDeviceConfig>> GetActiveConfigs(DateTime now);
    }
}
