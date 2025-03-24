using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Interface;

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


                var result = await _adapter.GetEnvironmentDataByFilter(from, to, area);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting environment data: {ex.Message}");
                return null;
            }
        }

        public async Task<List<EnvironmentData>> GetEnvironmentDataByDate(DateTime date, string area)
        {
            try
            {

                var result = await _adapter.GetEnvironmentDataByDate(date, area);
                return result;
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
        public async Task<(double Humidity, double AirQuality, double Temperature, double Brightness)> GetAverageEnvironmentData(DateTime date)
        {
            try
            {
                var result = await _adapter.GetAverageEnvironmentData(date);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding environment data: {ex.Message}");
                return default;
            }
        }
    }
}