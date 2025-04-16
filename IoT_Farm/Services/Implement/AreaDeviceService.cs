using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;
using MongoDB.Bson;

namespace IoT_Farm.Services.Implement
{
    public class AreaDeviceService : IAreaDeviceService
    {
        private readonly IAreaDeviceRepository _repo;

        public AreaDeviceService(IAreaDeviceRepository repo)
        {
            _repo = repo;
        }

        public async Task<ResultModel> CreateAsync(AreaDeviceRequestModel model)
        {
            // Lấy khu vực có AreaId trùng
            var existingAreas = await _repo.GetByAreaIdAsync(model.AreaId);
            var existingArea = existingAreas.FirstOrDefault();

            // Chuyển danh sách DeviceDetailRequestModel sang Device
            var newDevices = model.DeviceDetails.Select(d => new Device
            {
                Name = d.Name,
                Type = d.Type,
                Details = d.Details
            }).ToList();

            if (existingArea != null)
            {
                // Gộp thiết bị cũ và mới
                existingArea.DeviceDetails ??= new List<Device>();
                existingArea.DeviceDetails.AddRange(newDevices);

                var updateResult = await _repo.UpdateAsync(existingArea.Id, existingArea);

                return new ResultModel
                {
                    Status = updateResult,
                    Message = updateResult ? "Đã thêm thiết bị vào khu vực hiện có." : "Không thể thêm thiết bị mới vào khu vực.",
                    Data = updateResult ? existingArea : null
                };
            }
            else
            {
                // Tạo khu vực mới với thiết bị mới
                var newAreaDevice = new AreaDevice
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    AreaId = model.AreaId,
                    Topic = model.Topic,
                    DeviceDetails = newDevices
                };

                await _repo.AddAsync(newAreaDevice);

                return new ResultModel
                {
                    Status = true,
                    Message = "Đã tạo khu vực mới và thêm thiết bị.",
                    Data = newAreaDevice
                };
            }
        }




        public async Task<bool> DeleteAsync(string id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<List<ResultModel>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(x => new ResultModel
            {
                Status = true,
                Data = x
            }).ToList();
        }

        public async Task<List<AreaDevice>> GetByAreaIdAsync(string areaId)
        {
            return await _repo.GetByAreaIdAsync(areaId);
        }

        public async Task<List<AreaDevice>> GetByDeviceIdAsync(string deviceId)
        {
            return await _repo.GetByDeviceIdAsync(deviceId);
        }

        public async Task<AreaDevice?> GetByIdAsync(string id)
        {
            return await _repo.GetByIdAsync(id);
        }

        public async Task<bool> UpdateAsync(string id, AreaDevice model)
        {
            return await _repo.UpdateAsync(id, model);
        }
    }
}
