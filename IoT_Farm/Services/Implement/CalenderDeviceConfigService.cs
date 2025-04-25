using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;
using MongoDB.Bson;

namespace IoT_Farm.Services.Implement
{
    public class CalenderDeviceConfigService : ICalenderDeviceConfigService
    {
        private readonly ICalenderConfigDeviceRepository _repo;

        public CalenderDeviceConfigService(ICalenderConfigDeviceRepository repo)
        {
            _repo = repo;
        }

        public async Task<ResultModel> CreateAsync(CalenderDeviceConfigRequestModel model)
        {
            try
            {

                var newItem = new CalenderDeviceConfig
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Name = model.Name,
                    Device = model.Device,
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now,
                    Area = model.Area,
                    Date = model.Date,
                    Status = true,
                    Fan = model.Fan,
                    Heater = model.Heater,
                    Light = model.Light,
                    Pump = model.Pump
                };

                return await _repo.CreateDeviceConfigAsync(newItem);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ResultModel
                {
                    Data = model,
                    Message = ex.Message,
                    Status = false
                };
            }
        }

        public async Task<ResultModel> DeleteAsync(string id)
        {
            try
            {
                return await _repo.DeleteDeviceConfigAsync(id);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ResultModel
                {
                    Data = id,
                    Message = ex.Message,
                    Status = false
                };
            }
        }

        public async Task<List<CalenderDeviceConfig>> GetAllAsync()
        {
            try
            {
                return await _repo.GetAllDeviceConfigAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<CalenderDeviceConfig>> GetByAreaAsync(string area)
        {
            try
            {
                return await _repo.GetByAreaAsync(area);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<CalenderDeviceConfig>> GetByStatusAsync(bool status)
        {
            try
            {
                return await _repo.GetByStatusAsync(status);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<ResultModel> UpdateAsync(CalenderDeviceConfig model)
        {
            try
            {
                return await _repo.UpdateDeviceConfigAsync(model.Id, model);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ResultModel
                {
                    Data = model,
                    Message = ex.Message,
                    Status = false
                };
            }
        }
    }
}
