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

        public async Task<List<CalenderDeviceConfig>> GetActiveConfigs(DateTime now)
        {
            try
            {
                var today = now.Date;
                var currentTime = now.TimeOfDay;
                var configs = await _databaseAdapter.FindAsync(x => x.Status == true && x.Date.Start <= today && x.Date.End >= today);

                var activeConfigs = new List<CalenderDeviceConfig>();
                foreach (var config in configs)
                {
                    // Kiểm tra từng loại thiết bị có nằm trong khung giờ hoạt động
                    bool lightInTime = config.Light?.Time != null &&
                                       IsInTimeRange(config.Light.Time.Start.ToString(), config.Light.Time.End.ToString(), currentTime);

                    bool fanInTime = config.Fan?.Time != null &&
                                     IsInTimeRange(config.Fan.Time.Start.ToString(), config.Fan.Time.End.ToString(), currentTime);

                    bool pumpInTime = config.Pump?.Time != null &&
                                      IsInTimeRange(config.Pump.Time.Start.ToString(), config.Pump.Time.End.ToString(), currentTime);

                    bool heaterInTime = config.Heater?.Time != null &&
                                        IsInTimeRange(config.Heater.Time.Start.ToString(), config.Heater.Time.End.ToString(), currentTime);

                    // Nếu ít nhất một thiết bị đang trong thời gian hoạt động thì đưa vào danh sách
                    if (lightInTime || fanInTime || pumpInTime || heaterInTime)
                    {
                        activeConfigs.Add(config);
                    }
                }

                return activeConfigs;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        private bool IsInTimeRange(string start, string end, TimeSpan now)
        {
            if (TimeSpan.TryParse(start, out var startTime) && TimeSpan.TryParse(end, out var endTime))
            {
                if (startTime <= endTime)
                {
                    return now >= startTime && now <= endTime;
                }
                else
                {
                    // Trường hợp chạy qua nửa đêm, ví dụ 22:00 đến 02:00
                    return now >= startTime || now <= endTime;
                }
            }
            return false;
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
