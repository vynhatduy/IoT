using IoT_Farm.Datas;

namespace IoT_Farm.Repositories.Interface
{
    public interface IEnvironmentRepository : IGenericRepository<EnvironmentData>
    {
        Task<List<EnvironmentData>> GetByAreaAsync(string areaId);
        Task<EnvironmentData?> GetLatestAsync();
        Task<List<EnvironmentData>> GetEnvironmentDataByArea(DateTime from, DateTime to, string area);
        Task<bool> AddAsync(EnvironmentData data);
    }
}
