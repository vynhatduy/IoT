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
        private readonly IWeatherDeviceConfigService _weathrService;
        private readonly ICalenderDeviceConfigService _calenderService;

        public DeviceConfigController(IWeatherDeviceConfigService weathrService, ICalenderDeviceConfigService calenderService)
        {
            _weathrService = weathrService;
            _calenderService = calenderService;
        }

        [HttpGet("according-weather/all")]
        public async Task<IActionResult> GetDeviceConfigAccordingWeather()
        {
            var result = await _weathrService.GetAllAsync();
            return result != null ? Ok(result) : NotFound(result);
        }
        [HttpGet("according-weather/area")]
        public async Task<IActionResult> GetDeviceConfigAccordingWeatherByArea(string area)
        {
            var result = await _weathrService.GetByAreaAsync(area);
            return result != null ? Ok(result) : NotFound(result);
        }
        [HttpGet("according-weather")]
        public async Task<IActionResult> GetDeviceConfigAccordingWeatherByStatus(bool status)
        {
            var result = await _weathrService.GetByStatusAsync(status);
            return result != null ? Ok(result) : NotFound(result);
        }
        [HttpPost("according-weather/create")]
        public async Task<IActionResult> CreateConfigAccordingWeather(WeatherConfigDeviceRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _weathrService.CreateAsync(model);
            return result.Status ? Ok(result) : BadRequest(result);
        }

        [HttpPut("according-weather/update")]
        public async Task<IActionResult> UpdateConfigAccordingWeather(DeviceConfigWeather model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _weathrService.UpdateAsync(model.Id, model);
            return result.Status ? Ok(result) : BadRequest(result);
        }
        [HttpDelete("according-weather/delete")]
        public async Task<IActionResult> DeleteConfigAccordingWeather(string id)
        {
            var result = await _weathrService.DeleteAsync(id);
            return result.Status ? Ok(result) : BadRequest(result);
        }

        [HttpGet("according-calender/all")]
        public async Task<IActionResult> GetDeviceConfigAccordingCalender()
        {
            var result = await _calenderService.GetAllAsync();
            return result != null ? Ok(result) : NotFound(result);
        }
        [HttpGet("according-calender/area")]
        public async Task<IActionResult> GetDeviceConfigAccordingCalenderByArea(string area)
        {
            var result = await _calenderService.GetByAreaAsync(area);
            return result != null ? Ok(result) : NotFound(result);
        }
        [HttpGet("according-calender")]
        public async Task<IActionResult> GetDeviceConfigAccordingCalenderByStatus(bool status)
        {
            var result = await _calenderService.GetByStatusAsync(status);
            return result != null ? Ok(result) : NotFound(result);
        }
        [HttpPost("according-calender/create")]
        public async Task<IActionResult> CreateConfigAccordingCalender(CalenderDeviceConfigRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _calenderService.CreateAsync(model);
            return result.Status ? Ok(result) : BadRequest(result);
        }

        [HttpPut("according-calender/update")]
        public async Task<IActionResult> UpdateConfigAccordingCalender(CalenderDeviceConfig model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _calenderService.UpdateAsync(model);
            return result.Status ? Ok(result) : NotFound(result);
        }
        [HttpDelete("according-calender/delete")]
        public async Task<IActionResult> DeleteConfigAccordingCalender(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _calenderService.DeleteAsync(id);
            return result.Status ? Ok(result) : NotFound(result);
        }

    }
}
