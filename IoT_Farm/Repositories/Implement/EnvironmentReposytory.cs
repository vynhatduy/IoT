using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Interface;
using MongoDB.Driver;

namespace IoT_Farm.Repositories.Implement
{
    public class EnvironmentRepository : GenericRepository<EnvironmentData>, IEnvironmentRepository
    {
        private readonly EnvironmentDataAdapter _adapter;

        public EnvironmentRepository(DatabaseAdapterFactory adapterFactory, EnvironmentDataAdapter adapter)
            : base(adapterFactory)
        {
            _adapter = adapter;
        }

        public async Task<List<EnvironmentData>> GetByAreaAsync(string areaId)
        {
            var result = await _databaseAdapter.GetAsync(d => d.Area == areaId);

            return result;
        }

        public async Task<EnvironmentData?> GetLatestAsync()
        {
            var result = await _databaseAdapter.FindOneAsync(
                filter: _ => true,
                sort: q => q.OrderByDescending(d => d.Timestamp)
            );

            return result;
        }

        public async Task<List<EnvironmentData>> GetEnvironmentDataByArea(DateTime from, DateTime to, string area)
        {
            try
            {
                from = from.Date;
                to = to.Date.AddDays(1).AddTicks(-1);
                var filter = Builders<EnvironmentData>.Filter.And(
                    Builders<EnvironmentData>.Filter.Eq(d => d.Area, area),
                    Builders<EnvironmentData>.Filter.Gte(d => d.Timestamp, from),
                    Builders<EnvironmentData>.Filter.Lte(d => d.Timestamp, to)
                );

                // Query the data using the filter
                var result = await _adapter.GetEnvironmentDataAsync(filter);

                // Sort by Timestamp and return the result as a list
                return result.OrderBy(d => d.Timestamp).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting environment data: {ex.Message}");
                return null;
            }
        }


        public async Task<bool> AddAsync(EnvironmentData data)
        {
            try
            {

                await _databaseAdapter.AddAsync(data);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding environment data: {ex.Message}");
                return false;
            }
        }
    }
}