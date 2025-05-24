using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;

namespace IoT_Farm.Services.Implement
{
    public class IoTDeviceService : IIoTDeviceService
    {
        private readonly IIoTDeviceRepository _repo;

        public IoTDeviceService(IIoTDeviceRepository repo)
        {
            _repo = repo;
        }

        public async Task<ResultModel> GetIoTDeviceByArea()
        {
            var list = new List<IoTDeviceResponseModel>();
            try
            {
                var result = await _repo.GetDataByArea();
                if (result == null && result.Count() < 0)
                {
                    return new ResultModel
                    {
                        Status = false,
                        Message = "Không có dữ liệu phù hợp"
                    };
                }
                foreach (var item in result)
                {
                    list.Add(new IoTDeviceResponseModel
                    {
                        DeviceID = item.DeviceID,
                        EspModel = item.EspModel,
                        Fan = item.Fan,
                        Heater = item.Heater,
                        KhuVuc = item.KhuVuc,
                        Light = item.Light,
                        Pump = item.Pump,
                        Status = item.Status,
                        Name = item.Name

                    });
                }
                return new ResultModel
                {
                    Data = list,
                    Status = true
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

        public async Task<bool> SaveData(IoTDeviceRequestModel model)
        {
            try
            {
                var newDevice = new IoTDevice
                {
                    DeviceID = model.DeviceID,
                    EspModel = model.EspModel,
                    Fan = model.Fan,
                    FirmwareVersion = model.FirmwareVersion,
                    Heater = model.Heater,
                    IpAddress = model.IpAddress,
                    KhuVuc = model.KhuVuc ?? "",
                    Light = model.Light,
                    Pump = model.Pump,
                    Status = model.Status,
                    Uptime = model.Uptime,
                    WiFiSignal = model.WiFiSignal
                };
                return await _repo.SaveData(newDevice);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
