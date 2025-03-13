using IoT_Farm.Datas;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;

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
    }
}
