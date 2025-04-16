using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using System.Linq.Expressions;

namespace IoT_Farm.Repositories.Interface
{
    public interface IAreaDeviceRepository : IGenericRepository<AreaDevice>
    {
        Task<bool> AnyAsync(Expression<Func<AreaDevice, bool>> predicate);
        Task<List<AreaDevice>> GetByAreaIdAsync(string areaId);
        Task<List<AreaDevice>> GetByDeviceIdAsync(string deviceId);
        Task<AreaDevice?> GetByIdAsync(string id);
        Task<bool> UpdateAsync(string id, AreaDevice model);
        Task<bool> DeleteAsync(string id);
        Task<bool> SaveDeviceControlAsync(DeviceRequestModel model);
    }
}
