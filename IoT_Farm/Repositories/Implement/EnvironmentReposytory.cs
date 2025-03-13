using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Interface;

namespace IoT_Farm.Repositories.Implement
{
    public class EnvironmentRepository : GenericRepository<EnvironmentData>, IEnvironmentRepository
    {
        public EnvironmentRepository(DatabaseAdapterFactory adapterFactory)
            : base(adapterFactory)
        {
        }
        public async Task<List<EnvironmentData>> GetByAreaAsync(string areaId)
        {
            var allData = await _databaseAdapter.GetAsync();
            return allData.Where(d => d.SensorLocation == areaId).ToList();
        }

        public async Task<EnvironmentData?> GetLatestAsync()
        {
            var allData = await _databaseAdapter.GetAsync();
            return allData.OrderByDescending(d => d.Timestamp).FirstOrDefault();
        }
    }
}