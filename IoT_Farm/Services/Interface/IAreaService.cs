using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;

namespace IoT_Farm.Services.Interface
{
    public interface IAreaService
    {
        Task<List<Area>> GetAllAsync();
        Task<Area> GetByIdAsync(string id);
        Task<ResultModel> CreateAsync(AreaRequestModel area);
        Task<bool> UpdateAsync(string id, Area area);
        Task<bool> DeleteAsync(string id);
    }
}
