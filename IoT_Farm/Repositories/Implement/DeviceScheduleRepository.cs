using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Interface;
using MongoDB.Driver;

namespace IoT_Farm.Repositories.Implement
{
    public class DeviceScheduleRepository : GenericRepository<DeviceScheduleLastSent>, IDeviceScheduleRepository
    {
        public DeviceScheduleRepository(DatabaseAdapterFactory adapterFactory) : base(adapterFactory)
        {
        }

        // Lấy thông tin LastSent của thiết bị
        public async Task<DeviceScheduleLastSent?> GetLastSentAsync(string device, string area, string type)
        {
            try
            {
                // Sử dụng phương thức FindOneAsync từ GenericRepository
                return await _databaseAdapter.FindOneAsync(x => x.Device == device && x.Area == area && x.Type == type);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error fetching last sent: {ex.Message}");
                return null;
            }
        }

        // Kiểm tra sự tồn tại của thông tin lịch trình
        public async Task<bool> ExistsAsync(string device, string area, string type)
        {
            try
            {
                var filter = Builders<DeviceScheduleLastSent>.Filter
                    .Eq(x => x.Device, device) &
                    Builders<DeviceScheduleLastSent>.Filter.Eq(x => x.Area, area) &
                    Builders<DeviceScheduleLastSent>.Filter.Eq(x => x.Type, type);

                var count = await _databaseAdapter.CountDocumentsAsync(filter);
                return count > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error checking existence: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> UpdateLastSentAsync(string device, string area, string type, DateTime lastSent)
        {
            try
            {
                var filter = Builders<DeviceScheduleLastSent>.Filter
                    .Eq(x => x.Device, device) &
                    Builders<DeviceScheduleLastSent>.Filter.Eq(x => x.Area, area) &
                    Builders<DeviceScheduleLastSent>.Filter.Eq(x => x.Type, type);

                var exists = await ExistsAsync(device, area, type);

                if (exists)
                {
                    var update = Builders<DeviceScheduleLastSent>.Update.Set(x => x.LastSent, lastSent);
                    var result = await _databaseAdapter.UpdateOneAsync(filter, update);
                    return result;
                }
                else
                {
                    var newItem = new DeviceScheduleLastSent
                    {
                        Device = device,
                        Area = area,
                        Type = type,
                        LastSent = lastSent
                    };
                    var insertResult = await _databaseAdapter.InsertOneAsync(newItem);
                    return insertResult;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error updating last sent: {ex.Message}");
                return false;
            }
        }
    }
}
