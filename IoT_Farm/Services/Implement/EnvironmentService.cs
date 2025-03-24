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

        public async Task<bool> SaveEnvironmentData(EnvironmentData data)
        {
            return await _repository.AddAsync(data);
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
            var result = await _repository.GetAllAsync();
            return result.ToList();
        }

        public async Task<List<EnvironmentData>> GetEnvironmentDataByArea(string areaId)
        {
            return await _repository.GetByAreaAsync(areaId);
        }

        public async Task<EnvironmentData?> GetLatestEnvironmentData()
        {
            return await _repository.GetLatestAsync();
        }
        public async Task<List<EnvironmentData>> GetEnvironmentDataByArea(DateTime from, DateTime to, string area)
        {
            return await _repository.GetEnvironmentDataByArea(from, to, area);
        }

        public async Task<List<EnvironmentData>> GetEnvironmentDataByDate(DateTime date, string area)
        {
            return await _repository.GetEnvironmentDataByDate(date, area);
        }
        public async Task<(double Humidity, double AirQuality, double Temperature, double Brightness)> GetAverageEnvironmentData(DateTime date)
        {
            return await _repository.GetAverageEnvironmentData(date);
        }
    }
}
