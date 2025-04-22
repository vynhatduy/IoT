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

        public async Task<ResultModel> DeleteDevicesAsync(List<DeviceToDeleteRequestModel> model)
        {
            // Lấy tất cả các thiết bị trong cơ sở dữ liệu
            var allDevices = await _repo.GetAllAsync();
            if (allDevices == null || !allDevices.Any())
            {
                return new ResultModel
                {
                    Status = false,
                    Message = "Không tìm thấy dữ liệu thiết bị"
                };
            }

            // Tạo danh sách các thiết bị cần cập nhật
            var devicesToUpdate = new List<AreaDevice>();
            foreach (var deleteRequest in model)
            {
                var device = allDevices.FirstOrDefault(d =>
                    d.AreaId == deleteRequest.AreaId &&
                    d.Id == deleteRequest.Id);

                if (device != null &&
                    device.DeviceDetails.Any(dd => dd.Id == deleteRequest.OriginalId))
                {
                    // Thêm vào danh sách cập nhật nếu chưa có
                    if (!devicesToUpdate.Any(d => d.Id == device.Id))
                    {
                        devicesToUpdate.Add(device);
                    }
                }
            }

            if (!devicesToUpdate.Any())
            {
                return new ResultModel
                {
                    Status = false,
                    Message = "Không tìm thấy thiết bị cần xóa"
                };
            }

            // Biến theo dõi các thao tác
            var updatedDevices = 0;
            var deletedDetails = 0;
            var deletedDevices = 0;

            // Xử lý từng thiết bị
            foreach (var areaDevice in devicesToUpdate)
            {
                bool deviceChanged = false;

                // Xử lý từng DeviceDetail
                for (int i = areaDevice.DeviceDetails.Count - 1; i >= 0; i--)
                {
                    var deviceDetail = areaDevice.DeviceDetails[i];
                    bool detailChanged = false;

                    // Duyệt qua từng yêu cầu xóa
                    foreach (var deleteRequest in model)
                    {
                        // Chỉ xử lý nếu là đúng device và deviceDetail
                        if (areaDevice.Id == deleteRequest.Id &&
                            areaDevice.AreaId == deleteRequest.AreaId &&
                            deviceDetail.Id == deleteRequest.OriginalId)
                        {
                            // Xóa trường GroupType khỏi tất cả các chi tiết
                            for (int j = deviceDetail.Details.Count - 1; j >= 0; j--)
                            {
                                var detail = deviceDetail.Details[j];

                                // Kiểm tra xem trường cần xóa có tồn tại không
                                if (detail.ContainsKey(deleteRequest.GroupType))
                                {
                                    detail.Remove(deleteRequest.GroupType);
                                    detailChanged = true;
                                    deviceChanged = true;
                                }

                                // Nếu sau khi xóa không còn trường nào, xóa luôn chi tiết này
                                if (!detail.Any())
                                {
                                    deviceDetail.Details.RemoveAt(j);
                                    detailChanged = true;
                                    deviceChanged = true;
                                }
                            }
                        }
                    }

                    // Nếu sau khi xóa các trường, không còn chi tiết nào, xóa DeviceDetail
                    if (detailChanged && !deviceDetail.Details.Any())
                    {
                        areaDevice.DeviceDetails.RemoveAt(i);
                        deletedDetails++;
                        deviceChanged = true;
                    }
                }

                // Nếu không còn DeviceDetail nào, xóa toàn bộ thiết bị
                if (deviceChanged)
                {
                    if (!areaDevice.DeviceDetails.Any())
                    {
                        // Xóa toàn bộ thiết bị nếu không còn chi tiết
                        var deleteResult = await _repo.DeleteAsync(areaDevice.Id);
                        if (!deleteResult)
                        {
                            return new ResultModel
                            {
                                Status = false,
                                Message = $"Xảy ra lỗi khi xóa thiết bị trong khu vực: {areaDevice.AreaId}, ID: {areaDevice.Id}",
                                Data = areaDevice
                            };
                        }
                        deletedDevices++;
                    }
                    else
                    {
                        // Cập nhật lại thiết bị nếu còn chi tiết
                        var updateResult = await _repo.UpdateAsync(areaDevice.Id, areaDevice);
                        if (!updateResult)
                        {
                            return new ResultModel
                            {
                                Status = false,
                                Message = $"Xảy ra lỗi khi cập nhật thiết bị trong khu vực: {areaDevice.AreaId}, ID: {areaDevice.Id}",
                                Data = areaDevice
                            };
                        }
                        updatedDevices++;
                    }
                }
            }

            return new ResultModel
            {
                Status = true,
                Message = $"Xóa thiết bị thành công. Đã cập nhật {updatedDevices} thiết bị, xóa {deletedDetails} chi tiết và {deletedDevices} thiết bị.",
                Data = new { UpdatedDevices = updatedDevices, DeletedDetails = deletedDetails, DeletedDevices = deletedDevices }
            };
        }

        public async Task<ResultModel> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return new ResultModel
            {
                Status = true,
                Data = list,
                Message = null
            };
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
