using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace IoT_Farm.Controllers
{
    [Route("api/deviceConfig")]
    [ApiController]
    public class DeviceConfigController : ControllerBase
    {
        private readonly IDeviceConfigService _service;

        public DeviceConfigController(IDeviceConfigService service)
        {
            _service = service;
        }

        [HttpGet("according-weather/all")]
        public async Task<IActionResult> GetDeviceConfigAccordingWeather()
        {
            var result = await _service.GetAllAsync();
            return result != null ? Ok(result) : NotFound(result);
        }
        [HttpGet("according-weather/area")]
        public async Task<IActionResult> GetDeviceConfigAccordingWeatherByArea(string area)
        {
            var result = await _service.GetByAreaAsync(area);
            return result != null ? Ok(result) : NotFound(result);
        }
        [HttpGet("according-weather")]
        public async Task<IActionResult> GetDeviceConfigAccordingWeatherByStatus(bool status)
        {
            var result = await _service.GetByStatusAsync(status);
            return result != null ? Ok(result) : NotFound(result);
        }
        [HttpPost("according-weather/create")]
        public async Task<IActionResult> CreateConfigAccordingWeather(DeviceConditionAccordingToWeatherConfigRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _service.CreateAsync(model);
            return result.Status ? Ok(result) : BadRequest(result);
        }

        [HttpPut("according-weather/update")]
        public async Task<IActionResult> UpdateConfigAccordingWeather(DeviceConfigWeather model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _service.UpdateAsync(model.Id, model);
            return result.Status ? Ok(result) : BadRequest(result);
        }
        [HttpDelete("according-weather/delete")]
        public async Task<IActionResult> DeleteConfigAccordingWeather(string id)
        {
            var result = await _service.DeleteAsync(id);
            return result.Status ? Ok(result) : BadRequest(result);
        }

        //[HttpGet("/according-calender/all")]
        //public async Task<IActionResult> GetDeviceConfigAccordingCalender()
        //{
        //    return Ok();
        //}
        //[HttpGet("/according-calender/")]
        //public async Task<IActionResult> GetDeviceConfigAccordingCalenderByArea(string area)
        //{
        //    return Ok();
        //}
        //[HttpGet("/according-calender")]
        //public async Task<IActionResult> GetDeviceConfigAccordingCalenderByStatus(bool status)
        //{
        //    return Ok();
        //}
        //[HttpPost("/according-calender/create")]
        //public async Task<IActionResult> CreateConfigAccordingCalender(DeviceConditionAccordingToWeatherConfigRequestModel model)
        //{
        //    return Ok();
        //}

        //[HttpPut("/according-calender/update")]
        //public async Task<IActionResult> UpdateConfigAccordingCalender(DeviceConfigCalender model)
        //{
        //    return Ok();
        //}
        //[HttpDelete("/according-calender/delete")]
        //public async Task<IActionResult> DeleteConfigAccordingCalender(string id)
        //{
        //    return Ok();
        //}

    }
}
