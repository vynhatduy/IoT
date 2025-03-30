using IoT_Farm.Datas;

namespace IoT_Farm.Services.Interface
{
    public interface IAreaService
    {
        Task<List<Area>> GetAllAsync();
        Task<Area> GetByIdAsync(string id);
        Task<Area> CreateAsync(Area area);
        Task<bool> UpdateAsync(string id, Area area);
        Task<bool> DeleteAsync(string id);
    }
}
