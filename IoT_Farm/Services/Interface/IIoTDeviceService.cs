using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;

namespace IoT_Farm.Services.Interface
{
    public interface IIoTDeviceService
    {
        Task<bool> SaveData(IoTDeviceRequestModel model);
        Task<ResultModel> GetIoTDeviceByArea();
    }
}