using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace IoT_Farm.Controllers
{
    [Route("api/areaDevice")]
    [ApiController]
    public class AreaDeviceController : ControllerBase
    {
        private readonly IAreaDeviceService _service;
        private readonly IIoTDeviceService _ioTDevice;

        public AreaDeviceController(IAreaDeviceService service, IIoTDeviceService ioTDevice)
        {
            _service = service;
            _ioTDevice = ioTDevice;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] AreaDeviceRequestModel model)
        {
            var result = await _service.CreateAsync(model);
            if (!result.Status) return BadRequest(result);
            return Ok(result);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(string id, [FromBody] AreaDevice model)
        {
            var success = await _service.UpdateAsync(id, model);
            if (!success) return NotFound(new { message = "Không tìm thấy thiết bị để cập nhật." });
            return Ok(new { message = "Cập nhật thành công." });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(string id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) return NotFound(new { message = "Không tìm thấy thiết bị để xoá." });
            return Ok(new { message = "Xoá thành công." });
        }
        [HttpDelete("deleteDevices")]
        public async Task<IActionResult> Deletes([FromBody] List<DeviceToDeleteRequestModel> model)
        {
            if (model == null || !model.Any())
            {
                return BadRequest("Không có thiết bị nào để xóa.");
            }
            try
            {
                var result = await _service.DeleteDevicesAsync(model);
                return result.Status ? Ok(result) : BadRequest(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi: " + ex.Message });
            }
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetById(string id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null) return NotFound(new { message = "Không tìm thấy thiết bị." });
            return Ok(result);
        }

        [HttpGet("by-area")]
        public async Task<IActionResult> GetByAreaId(string areaId)
        {
            var result = await _service.GetByAreaIdAsync(areaId);
            return Ok(result);
        }

        [HttpGet("by-device")]
        public async Task<IActionResult> GetByDeviceId(string deviceId)
        {
            var result = await _service.GetByDeviceIdAsync(deviceId);
            return Ok(result);
        }
        [HttpGet("iot-device")]
        public async Task<IActionResult> GetIoTDeviceByArea()
        {
            var result = await _ioTDevice.GetIoTDeviceByArea();
            return result.Status ? Ok(result) : BadRequest(result);
        }
    }
}
