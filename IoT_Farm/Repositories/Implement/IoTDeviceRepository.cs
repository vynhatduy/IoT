using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Interface;

namespace IoT_Farm.Repositories.Implement
{
    public class IoTDeviceRepository : GenericRepository<IoTDevice>, IIoTDeviceRepository
    {
        public IoTDeviceRepository(DatabaseAdapterFactory adapterFactory) : base(adapterFactory)
        {
        }

        public async Task<List<IoTDevice>> GetDataByArea()
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

        public async Task<bool> SaveData(IoTDevice model)
        {
            try
            {
                var item = await _databaseAdapter.FindOneAsync(x => x.DeviceID == model.DeviceID);
                var count = await _databaseAdapter.GetCount();

                if (item == null)
                {
                    model.Name = $"Thiết bị {count + 1}";
                    return await _databaseAdapter.InsertOneAsync(model);
                }

                item.KhuVuc = model.KhuVuc;
                item.WiFiSignal = model.WiFiSignal;
                item.Status = model.Status;
                item.IpAddress = model.IpAddress;
                item.Uptime = model.Uptime;
                item.EspModel = model.EspModel;
                item.FirmwareVersion = model.FirmwareVersion;
                item.Light = model.Light;
                item.Fan = model.Fan;
                item.Pump = model.Pump;
                item.Heater = model.Heater;

                return await _databaseAdapter.UpdateAsync(item.Id, item);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

    }
}
