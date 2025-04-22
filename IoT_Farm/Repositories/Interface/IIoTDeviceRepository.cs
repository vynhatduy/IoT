using IoT_Farm.Datas;

namespace IoT_Farm.Repositories.Interface
{
    public interface IIoTDeviceRepository : IGenericRepository<IoTDevice>
    {
        Task<bool> SaveData(IoTDevice model);
        Task<List<IoTDevice>> GetDataByArea();
    }
}
