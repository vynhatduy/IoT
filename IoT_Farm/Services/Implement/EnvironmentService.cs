using IoT_Farm.Datas;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;
using MongoDB.Driver;

namespace IoT_Farm.Services.Implement
{
    public class EnvironmentService : IEnvironmentService
    {
        private readonly IEnvironmentRepository _repository;

        public EnvironmentService(IEnvironmentRepository repository)
        {
            _repository = repository;
        }

        public async Task SaveEnvironmentData(EnvironmentData data)
        {
            await _repository.AddAsync(data);
        }

        public async Task<EnvironmentData> GetEnvironmentDataById(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<bool> UpdateEnvironmentData(string id, EnvironmentData data)
        {
            return await _repository.UpdateAsync(id, data);
        }

        public async Task<bool> DeleteEnvironmentData(string id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<List<EnvironmentData>> GetAllEnvironmentData()
        {
            return (await _repository.GetAllAsync()).ToList();
        }

        public async Task<List<EnvironmentData>> GetEnvironmentDataByArea(string areaId)
        {
            return await _repository.GetByAreaAsync(areaId);
        }

        public async Task<EnvironmentData?> GetLatestEnvironmentData()
        {
            return await _repository.GetLatestAsync();
        }
        public async Task<object> GetStatistics(string region, DateTime? from, DateTime? to, string? type)
        {
            // Mặc định lấy dữ liệu trong 7 ngày gần nhất (kể cả hôm nay)
            DateTime startDate = from ?? DateTime.UtcNow.Date.AddDays(-6);
            DateTime endDate = to ?? DateTime.UtcNow.Date.AddDays(1).AddTicks(-1);

            // Nếu type rỗng, mặc định là "all"
            type = string.IsNullOrWhiteSpace(type) ? "all" : type.Trim().ToLower(); // ✅ Chuyển thành chữ thường

            // Danh sách các loại hợp lệ (chữ thường)
            var validTypes = new HashSet<string> { "all", "temperature", "humidity", "airquality", "brightness" };

            // Nếu type không hợp lệ, báo lỗi
            if (!validTypes.Contains(type))
            {
                throw new ArgumentException($"Invalid type '{type}'. Allowed values: {string.Join(", ", validTypes)}.");
            }

            return await _repository.GetData(region, startDate, endDate, type);
        }

    }
}
