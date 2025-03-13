using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Interface;
using MongoDB.Driver;

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
        public async Task<object> GetData(string region, DateTime from, DateTime to, string type)
        {
            // Chuyển type thành chữ thường
            type = string.IsNullOrWhiteSpace(type) ? "all" : type.Trim().ToLower();

            // Danh sách các loại hợp lệ (chữ thường)
            var validTypes = new HashSet<string> { "all", "temperature", "humidity", "airquality", "brightness" };

            // Kiểm tra nếu type không hợp lệ
            if (!validTypes.Contains(type))
            {
                throw new ArgumentException($"Invalid type '{type}'. Allowed values: {string.Join(", ", validTypes)}.");
            }

            var filter = Builders<EnvironmentData>.Filter.And(
                Builders<EnvironmentData>.Filter.Eq(d => d.SensorLocation, region),
                Builders<EnvironmentData>.Filter.Gte(d => d.Timestamp, from),
                Builders<EnvironmentData>.Filter.Lte(d => d.Timestamp, to)
            );

            var data = await _databaseAdapter.FindByFilterDefinitionAsync(filter);

            if (type == "temperature")
            {
                return data.Select(d => new { d.Timestamp, d.Temperature }).ToList();
            }

            if (type == "all")
            {
                // Không nhóm theo Date mà giữ nguyên danh sách dữ liệu
                return data.Select(d => new
                {
                    d.Timestamp,
                    d.Temperature,
                    d.Humidity,
                    d.AirQuality,
                    d.Brightness
                }).ToList();
            }

            return data.Select(d => new { d.Timestamp, Value = GetValueByType(d, type) }).ToList();
        }

        private static double? GetValueByType(EnvironmentData data, string type)
        {
            return type switch
            {
                "humidity" => data.Humidity,
                "airquality" => data.AirQuality,
                "brightness" => data.Brightness,
                _ => null
            };
        }
    }
}