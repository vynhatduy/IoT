using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;

namespace IoT_Farm.Services.Interface
{
    public interface ICalenderDeviceConfigService
    {
        Task<List<CalenderDeviceConfig>> GetAllAsync();
        Task<List<CalenderDeviceConfig>> GetByAreaAsync(string area);
        Task<List<CalenderDeviceConfig>> GetByStatusAsync(bool status);
        Task<ResultModel> CreateAsync(CalenderDeviceConfigRequestModel model);
        Task<ResultModel> UpdateAsync(CalenderDeviceConfig model);
        Task<ResultModel> DeleteAsync(string id);
    }
}
