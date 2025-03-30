using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace IoT_Farm.Datas.Adapter
{
    public class EnvironmentDataAdapter
    {
        private readonly IMongoCollection<EnvironmentData> _collection;

        public EnvironmentDataAdapter(IMongoDatabase database)
        {
            _collection = database.GetCollection<EnvironmentData>("EnvironmentData");
        }

        public async Task<List<EnvironmentData>> GetEnvironmentDataAsync(FilterDefinition<EnvironmentData> filter)
        {
            try
            {
                // Fetch the data from the MongoDB collection based on the filter
                return await _collection.Find(filter).ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching data: {ex.Message}");
                return new List<EnvironmentData>();
            }
        }
        public async Task<List<EnvironmentData>> GetEnvironmentDataByDate(DateTime date, string area)
        {
            DateTime fromUTC_7 = date.ToUniversalTime().AddHours(7);
            DateTime toUTC_7 = date.AddDays(1).ToUniversalTime().AddHours(7);

            var data = await _collection.AsQueryable()
                .Where(d => d.Area.ToLower().Trim() == area.ToLower().Trim() &&
                            d.Timestamp >= fromUTC_7 && d.Timestamp < toUTC_7)
                .OrderBy(d => d.Timestamp)
                .ToListAsync();

            var filteredData = data
                .GroupBy(d => d.Timestamp.Hour)
                .Select(g => g.First())
                .ToList();

            return filteredData;
        }
        public async Task<List<EnvironmentData>> GetEnvironmentDataByFilter(DateTime from, DateTime to, string area)
        {
            DateTime fromUTC_7 = from.ToUniversalTime().AddHours(7);
            DateTime toUTC_7 = to.AddDays(1).ToUniversalTime().AddHours(7);
            var data = await _collection.AsQueryable()
                .Where(d => d.Area.ToLower().Trim() == area.ToLower().Trim() &&
                            d.Timestamp >= fromUTC_7 && d.Timestamp <= toUTC_7 &&
                            (d.Timestamp.Minute < 5 || (d.Timestamp.Minute >= 25 && d.Timestamp.Minute <= 30)))
                .OrderBy(d => d.Timestamp)
                .ToListAsync();


            var filteredData = data
                .GroupBy(d => d.Timestamp.Hour)
                .Select(g => g.First())
                .ToList();

            return filteredData;
        }
        public async Task<(double Humidity, double AirQuality, double Temperature, double Brightness)> GetAverageEnvironmentData(DateTime date)
        {
            DateTime fromUTC_7 = date.ToUniversalTime().AddHours(7);
            DateTime toUTC_7 = date.AddDays(1).ToUniversalTime().AddHours(7);
            var query = _collection.AsQueryable()
                .Where(d => d.Timestamp >= fromUTC_7 && d.Timestamp < toUTC_7);

            var result = await query
                .GroupBy(_ => 1)
                .Select(g => new
                {
                    Humidity = g.Average(d => d.Humidity),
                    AirQuality = g.Average(d => d.AirQuality),
                    Temperature = g.Average(d => d.Temperature),
                    Brightness = g.Average(d => d.Brightness)
                })
                .FirstOrDefaultAsync();

            return result != null ? (result.Humidity, result.AirQuality, result.Temperature, result.Brightness) : (0, 0, 0, 0);
        }

    }

}
