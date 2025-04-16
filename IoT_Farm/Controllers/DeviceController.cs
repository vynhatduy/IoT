using IoT_Farm.Models.Request;
using IoT_Farm.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace IoT_Farm.Controllers
{
    [Route("api/device")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly IDeviceControlService _service;

        public DeviceController(IDeviceControlService service)
        {
            _service = service;
        }
        [HttpPost("control")]
        public async Task<IActionResult> ControlDevice(DeviceRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _service.SendCommandAsync(model);
            return result.Status ? Ok(result) : BadRequest(result);
        }
        [HttpGet("history")]
        public async Task<IActionResult> GetCommandHistory(string deviceId)
        {
            var history = await _service.GetCommandHistoryAsync(deviceId);
            return Ok(history);
        }
        [HttpGet("history/latest")]
        public async Task<IActionResult> GetCommandHistoryLatest(string deviceId)
        {
            var history = await _service.GetCommandHistoryLatestAsync(deviceId);
            return Ok(history);
        }
    }
}
