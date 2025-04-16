using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;

namespace IoT_Farm.Services.Interface
{
    public interface IAreaDeviceService
    {
        Task<List<ResultModel>> GetAllAsync();
        Task<ResultModel> CreateAsync(AreaDeviceRequestModel model);

        Task<List<AreaDevice>> GetByAreaIdAsync(string areaId);
        Task<List<AreaDevice>> GetByDeviceIdAsync(string deviceId);
        Task<AreaDevice?> GetByIdAsync(string id);
        Task<bool> UpdateAsync(string id, AreaDevice model);
        Task<bool> DeleteAsync(string id);
    }
}
