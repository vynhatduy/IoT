using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Interface;

namespace IoT_Farm.Repositories.Implement
{
    public class DeviceConfigRepository : GenericRepository<DeviceConfigWeather>, IDeviceConfigRepository
    {
        public DeviceConfigRepository(DatabaseAdapterFactory adapterFactory) : base(adapterFactory)
        {
        }


        public async Task<ResultModel> CreateDeviceConfigAsync(DeviceConfigWeather model)
        {
            try
            {
                var result = await _databaseAdapter.AddAsync(model);
                return new ResultModel
                {
                    Data = model,
                    Message = result ? "Tạo thành công" : "Không thể tạo trong lúc này",
                    Status = result
                };
            }
            catch (Exception ex)
            {
                return new ResultModel
                {
                    Message = ex.Message,
                    Status = false
                };
            }
        }

        public async Task<ResultModel> DeleteDeviceConfigAsync(string id)
        {
            try
            {
                var item = await _databaseAdapter.FindOneAsync(x => x.Id == id);
                if (item == null)
                {
                    return new ResultModel
                    {
                        Data = item,
                        Message = "Không tìm thấy dữ liệu cần xóa trong database",
                        Status = true
                    };
                }
                var result = await _databaseAdapter.DeleteAsync(id);
                return new ResultModel
                {
                    Status = result,
                    Message = result ? "Đã xóa thành công" : "Không thể xóa dữ liệu hiện tại",
                    Data = item
                };
            }
            catch (Exception ex)
            {
                return new ResultModel
                {
                    Status = false,
                    Message = ex.Message,
                    Data = null
                };
            }
        }

        public async Task<List<DeviceConfigWeather>> GetAllDeviceConfigAsync()
        {
            try
            {
                return await _databaseAdapter.GetAsync(_ => true);

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
                var listDeviceConfig = await _databaseAdapter.FindAsync(x => x.Area.Equals(area));
                return listDeviceConfig;
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
                var listDeviceConfig = await _databaseAdapter.FindAsync(x => x.Status == status);
                return listDeviceConfig;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<ResultModel> UpdateDeviceConfigAsync(string id, DeviceConfigWeather model)
        {
            try
            {
                var item = await _databaseAdapter.FindOneAsync(x => x.Id == id);
                if (item == null)
                {
                    return new ResultModel
                    {
                        Data = model,
                        Message = "Không tìm thấy dữ liệu để cập nhật",
                        Status = false
                    };
                }
                var result = await _databaseAdapter.UpdateAsync(id, model);
                return new ResultModel
                {
                    Data = model,
                    Message = result ? "Cập nhật thành công" : "Không thể cập nhật trong lúc này",
                    Status = result
                };
            }
            catch (Exception ex)
            {
                return new ResultModel
                {
                    Message = ex.Message,
                    Status = false
                };
            }
        }
    }
}
