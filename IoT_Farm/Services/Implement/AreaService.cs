using IoT_Farm.Datas;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;

namespace IoT_Farm.Services.Implement
{
    public class AreaService : IAreaService
    {
        private readonly IAreaRepository _areaRepository;

        public AreaService(IAreaRepository areaRepository)
        {
            _areaRepository = areaRepository;
        }

        public async Task<List<Area>> GetAllAsync() => await _areaRepository.GetAllAsync();

        public async Task<Area> GetByIdAsync(string id) => await _areaRepository.GetByIdAsync(id);

        public async Task<Area> CreateAsync(Area area) => await _areaRepository.CreateAsync(area);

        public async Task<bool> UpdateAsync(string id, Area area) => await _areaRepository.UpdateAsync(id, area);

        public async Task<bool> DeleteAsync(string id) => await _areaRepository.DeleteAsync(id);
    }
}
