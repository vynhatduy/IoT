using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Interface;

namespace IoT_Farm.Repositories.Implement
{
    public class CalenderConfigDeviceRepository : GenericRepository<CalenderDeviceConfig>, ICalenderConfigDeviceRepository
    {
        public CalenderConfigDeviceRepository(DatabaseAdapterFactory adapterFactory) : base(adapterFactory)
        {
        }

        public async Task<ResultModel> CreateDeviceConfigAsync(CalenderDeviceConfig model)
        {
            try
            {
                var result = await _databaseAdapter.AddAsync(model);
                return new ResultModel
                {
                    Data = model,
                    Message = result ? "Tạo cấu hình theo lịch thành công" : "Không thể thực hiện tạo cấu hình",
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
                var result = await _databaseAdapter.DeleteAsync(id);
                return new ResultModel
                {
                    Data = id,
                    Message = result ? "Xóa hoàn tất cấu hình" : "Không thể thực hiện xóa cấu hình",
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

        public async Task<List<CalenderDeviceConfig>> GetAllDeviceConfigAsync()
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

        public async Task<List<CalenderDeviceConfig>> GetByAreaAsync(string area)
        {
            try
            {
                return await _databaseAdapter.FindAsync(x => x.Area == area);

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
                return await _databaseAdapter.FindAsync(x => x.Status == status);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<ResultModel> UpdateDeviceConfigAsync(string id, CalenderDeviceConfig model)
        {
            try
            {
                var result = await _databaseAdapter.UpdateAsync(id, model);
                return new ResultModel
                {
                    Data = model,
                    Status = result,
                    Message = result ? $"Cập nhật thành công: ${id}" : $"Không thể thực hiện lúc này ${id}"
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ResultModel
                {
                    Status = false,
                    Data = null,
                    Message = ex.Message
                };
            }
        }
    }
}
