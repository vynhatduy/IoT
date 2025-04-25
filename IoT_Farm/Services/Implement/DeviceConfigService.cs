using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;
using MongoDB.Bson;

namespace IoT_Farm.Services.Implement
{
    public class DeviceConfigService : IDeviceConfigService
    {
        private readonly IDeviceConfigRepository _repo;

        public DeviceConfigService(IDeviceConfigRepository repo)
        {
            _repo = repo;
        }

        public async Task<ResultModel> CreateAsync(DeviceConditionAccordingToWeatherConfigRequestModel model)
        {
            try
            {
                var newItem = new DeviceConfigWeather
                {
                    Area = model.Area,
                    DeviceName = model.Device,
                    Id = ObjectId.GenerateNewId().ToString(),
                    Name = model.Name,
                    Status = true,
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now,
                    Conditions = new Conditions
                    {
                        Fan = new ConditionFan
                        {
                            Aqi = model.Conditions.Fan.Aqi,
                            Humidity = model.Conditions.Fan.Humidity,
                            Temperature = model.Conditions.Fan.Temperature,
                        },
                        Heater = model.Conditions.Heater,
                        Light = model.Conditions.Light,
                        Pump = model.Conditions.Pump
                    }
                };
                return await _repo.CreateDeviceConfigAsync(newItem);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ResultModel
                {
                    Message = ex.Message,
                    Data = null,
                    Status = false,
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
                    Message = ex.Message,
                    Data = null,
                    Status = false,
                };
            }
        }

        public async Task<List<DeviceConfigWeather>> GetAllAsync()
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

        public async Task<List<DeviceConfigWeather>> GetByAreaAsync(string area)
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

        public async Task<List<DeviceConfigWeather>> GetByStatusAsync(bool status)
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

        public async Task<ResultModel> UpdateAsync(string id, DeviceConfigWeather model)
        {
            try
            {
                return await _repo.UpdateDeviceConfigAsync(id, model);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ResultModel
                {
                    Message = ex.Message,
                    Data = null,
                    Status = false,
                };
            }
        }
    }
}
