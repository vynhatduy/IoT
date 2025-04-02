using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Interface;

namespace IoT_Farm.Repositories.Implement
{
    public class DeviceControlRepository : GenericRepository<DeviceCommand>, IDeviceControlRepository
    {
        public DeviceControlRepository(DatabaseAdapterFactory adapterFactory) : base(adapterFactory)
        {
        }

        public async Task<List<DeviceCommand>> GetCommandHistoryAsync(string deviceId)
        {
            var result = await _databaseAdapter.GetAsync(cmd => cmd.DeviceId == deviceId);
            return result;
        }

        public async Task<DeviceCommand> GetCommandHistoryLatestAsync(string deviceId)
        {
            var result = await _databaseAdapter.GetAsync(cmd => cmd.DeviceId == deviceId);
            return result.OrderByDescending(x => x.Timestamp).First();
        }

        public async Task SaveCommandAsync(DeviceCommand command)
        {
            await _databaseAdapter.InsertOneAsync(command);
        }
    }
}
