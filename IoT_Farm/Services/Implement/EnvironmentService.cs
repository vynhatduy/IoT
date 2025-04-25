using IoT_Farm.Datas;
using IoT_Farm.Models.Response;
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

        public async Task<EnvironmentData?> GetLatestEnvironmentData(string area)
        {
            return await _repository.GetLatestAsync(area);
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

        public async Task<ResultModel> GetDataForReportByAreaDateType(string areaId, DateTime date)
        {
            try
            {
                var now = DateTime.Now;

                if (date.Date > now.Date)
                {
                    return new ResultModel
                    {
                        Status = false,
                        Message = "Ngày không hợp lệ. Không thể chọn ngày trong tương lai",
                        Data = null
                    };
                }

                var fromDate = date.Date.AddDays(-5);
                var toDate = date;

                var result = await _repository.GetDataForReportByAreaDateType(areaId, fromDate, toDate);

                if (result == null || result.Count < 1)
                {
                    return new ResultModel
                    {
                        Status = false,
                        Message = "Không có dữ liệu. Vui lòng thử lại.",
                        Data = null
                    };
                }

                //var filteredData = await FilterData(result, type);

                return new ResultModel
                {
                    Status = true,
                    Message = "Lấy dữ liệu thành công",
                    //Data = filteredData
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ResultModel
                {
                    Status = false,
                    Message = "Lỗi: " + ex.Message,
                    Data = null
                };
            }
        }
        private async Task<List<object>> FilterData(List<EnvironmentData> data, string filter)
        {
            return await Task.Run(() =>
            {
                return data.Select(x => new
                {
                    x.DeviceId,
                    x.Area,
                    Value = filter switch
                    {
                        "Temperature" => (object)x.Temperature,
                        "Humidity" => (object)x.Humidity,
                        "AirQuality" => (object)x.AirQuality,
                        "Light" => (object)x.Light,
                        _ => null
                    },
                    x.Timestamp
                })
                .Where(x => x.Value != null)
                .Cast<object>()
                .ToList();
            });
        }

        public async Task<ResultModel> GetDataForStatistics(DateTime from, DateTime to, string area, string type)
        {
            to = to.Date.AddDays(1).AddTicks(-1);
            try
            {
                var listData = await _repository.GetDataForReportByAreaDateType(area, from, to);
                if (listData == null || !listData.Any())
                {
                    return new ResultModel
                    {
                        Message = "Không có dữ liệu",
                        Data = null,
                        Status = false
                    };
                }

                var result = new List<EnvironmentResponseModel>();
                string typeLower = type.ToLower().Trim();

                var groupData = listData.GroupBy(x => x.Timestamp.Date).OrderBy(g => g.Key);


                switch (typeLower)
                {
                    case "humidity":
                        result = groupData.Select(x => new EnvironmentResponseModel
                        {
                            Area = area,
                            TimeStamp = x.Key,
                            Type = "Humidity",
                            Value = Math.Round(x.Average(x => x.Humidity), 3)
                        }).ToList();
                        break;

                    case "light":
                        result = groupData.Select(x => new EnvironmentResponseModel
                        {
                            Area = area,
                            TimeStamp = x.Key,
                            Type = "Light",
                            Value = Math.Round(x.Average(x => x.Light), 3)
                        }).ToList();
                        break;

                    case "airquality":
                        result = groupData.Select(x => new EnvironmentResponseModel
                        {
                            Area = area,
                            TimeStamp = x.Key,
                            Type = "AirQuality",
                            Value = Math.Round(x.Average(x => x.AirQuality), 3)
                        }).ToList();
                        break;

                    case "temperature":
                        result = groupData.Select(x => new EnvironmentResponseModel
                        {
                            Area = area,
                            TimeStamp = x.Key,
                            Type = "Temperature",
                            Value = Math.Round(x.Average(x => x.Temperature), 3)
                        }).ToList();
                        break;

                    default:
                        return new ResultModel
                        {
                            Status = false,
                            Message = "Không có loại dữ liệu yêu cầu"
                        };
                }

                return new ResultModel
                {
                    Data = result,
                    Status = true
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ResultModel
                {
                    Message = ex.Message,
                    Data = null,
                    Status = false
                };
            }
        }

    }
}
