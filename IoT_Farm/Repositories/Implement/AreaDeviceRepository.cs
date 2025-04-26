using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Models.Request;
using IoT_Farm.Repositories.Interface;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace IoT_Farm.Repositories.Implement
{
    public class AreaDeviceRepository : GenericRepository<AreaDevice>, IAreaDeviceRepository
    {
        private readonly IAreaRepository _areaRepo;

        public AreaDeviceRepository(DatabaseAdapterFactory adapterFactory, IAreaRepository areaRepo) : base(adapterFactory)
        {
            _areaRepo = areaRepo;
        }

        public async Task<bool> AnyAsync(Expression<Func<AreaDevice, bool>> predicate)
        {
            var result = await _databaseAdapter.FindAsync(predicate);
            return result.Any();
        }

        public async Task<List<AreaDevice>> GetByAreaIdAsync(string areaId)
        {
            return await _databaseAdapter.FindAsync(x => x.AreaId == areaId);
        }

        public async Task<List<AreaDevice>> GetByDeviceIdAsync(string deviceId)
        {
            return await _databaseAdapter.FindAsync(
                x => x.DeviceDetails.Any(d => d.Id == deviceId)
            );
        }

        public async Task<AreaDevice?> GetByIdAsync(string id)
        {
            return await _databaseAdapter.GetByIdAsync(id);
        }

        public async Task<bool> UpdateAsync(string id, AreaDevice model)
        {
            var filter = Builders<AreaDevice>.Filter.Eq("_id", ObjectId.Parse(id));
            var result = await _databaseAdapter.ReplaceOneAsync(filter, model);
            return result;
        }


        public async Task<bool> DeleteAsync(string id)
        {
            var existing = await _databaseAdapter.FindAsync(x => x.Id == id);
            if (existing == null) return false;

            await _databaseAdapter.DeleteAsync(id);
            return true;
        }

        public async Task<bool> SaveDeviceControlAsync(DeviceRequestModel model)
        {
            try
            {
                string areaId = model.Area;
                if (!ObjectId.TryParse(model.Area, out _))
                {
                    var areaFilter = Builders<Area>.Filter.Eq(a => a.Name, model.Area);
                    var area = await _areaRepo.GetByName(areaId);
                    if (area == null)
                    {
                        Console.WriteLine($"Không tìm thấy Area với tên {model.Area}");
                        return false;
                    }

                    areaId = area.Id;
                }
                var updateDetails = new List<Dictionary<string, bool>>();

                var deviceDetails = new Dictionary<string, bool>();

                if (model.Light.HasValue)
                {
                    deviceDetails.Add(DeviceDetail.Light, model.Light == 1);
                }

                if (model.Fan.HasValue)
                {
                    deviceDetails.Add(DeviceDetail.Fan, model.Fan == 1);
                }

                if (model.Pump.HasValue)
                {
                    deviceDetails.Add(DeviceDetail.Pump, model.Pump == 1);
                }

                if (model.Heater.HasValue)
                {
                    deviceDetails.Add(DeviceDetail.Heater, model.Heater == 1);
                }

                if (deviceDetails.Count > 0)
                {
                    updateDetails.Add(deviceDetails);
                }

                var filter = Builders<AreaDevice>.Filter.And(
                 Builders<AreaDevice>.Filter.Eq(a => a.AreaId, areaId),
                 Builders<AreaDevice>.Filter.ElemMatch(a => a.DeviceDetails, d => d.Name == model.DeviceId)
                );


                var areaDevice = await _databaseAdapter.FindOneAsync(filter);


                if (areaDevice == null) return false;
                var device = areaDevice.DeviceDetails.FirstOrDefault(d => d.Name == model.DeviceId);


                if (device == null) return false;
                device.Details = updateDetails;

                var updateFilter = Builders<AreaDevice>.Filter.Eq("_id", ObjectId.Parse(areaDevice.Id));

                var result = await _databaseAdapter.ReplaceOneAsync(updateFilter, areaDevice);

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<bool> CheckDeviceValid(string areaId, string deviceName)
        {
            try
            {
                var areaDevices = await _databaseAdapter.FindAsync(ad => ad.AreaId == areaId);
                foreach (var device in areaDevices)
                {
                    if (device.DeviceDetails.Any(d => d.Name == deviceName))
                    {
                        return false;
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }


    }
}
