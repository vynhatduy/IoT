using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;
using MongoDB.Bson;

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

        public async Task<ResultModel> CreateAsync(AreaRequestModel area)
        {
            try
            {
                var newItem = new Area
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Name = area.Name,
                    Topic = area.Topic
                };
                var result = await _areaRepository.CreateAsync(newItem);
                return new ResultModel
                {
                    Status = result != null ? true : false,
                    Data = result,
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ResultModel
                {
                    Status = false,
                    Message = ex.Message
                };
            }
        }

        public async Task<bool> UpdateAsync(string id, Area area) => await _areaRepository.UpdateAsync(id, area);

        public async Task<bool> DeleteAsync(string id) => await _areaRepository.DeleteAsync(id);
    }
}
