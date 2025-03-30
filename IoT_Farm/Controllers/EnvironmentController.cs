using IoT_Farm.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace IoT_Farm.Controllers
{
    [Route("api/environment")]
    [ApiController]
    public class EnvironmentController : ControllerBase
    {
        private readonly IEnvironmentService _environmentService;
        public EnvironmentController(IEnvironmentService environmentService)
        {
            _environmentService = environmentService;
        }
        /// <summary>
        /// Lấy toàn bộ dữ liệu môi trường
        /// </summary>
        [HttpGet("all")]
        public async Task<IActionResult> GetAllData()
        {
            var data = await _environmentService.GetAllEnvironmentData();
            return Ok(data);
        }
        /// <summary>
        /// Lấy dữ liệu theo khu vực (ví dụ: KV1, KV2)
        /// </summary>
        [HttpGet("area/{areaId}")]
        public async Task<IActionResult> GetDataByArea(string areaId)
        {
            var data = await _environmentService.GetEnvironmentDataByArea(areaId);
            if (data == null || !data.Any())
                return NotFound("No data found for this area.");

            return Ok(data);
        }

        /// <summary>
        /// Lấy dữ liệu mới nhất (1 bản ghi gần nhất)
        /// </summary>
        [HttpGet("latest")]
        public async Task<IActionResult> GetLatestData(string area)
        {
            var data = await _environmentService.GetLatestEnvironmentData(area);
            if (data == null)
                return NotFound("No data available.");

            return Ok(data);
        }
        [HttpGet("dataByArea")]
        public async Task<IActionResult> GetEnvironmentData(DateTime from, DateTime to, string area)
        {
            var data = await _environmentService.GetEnvironmentDataByArea(from, to, area);
            if (data == null)
                return NotFound("No data available.");

            return Ok(data);
        }
        [HttpGet("dataByDate")]
        public async Task<IActionResult> GetEnvironmentDataByDate(DateTime date, string area)
        {
            var data = await _environmentService.GetEnvironmentDataByDate(date, area);
            if (data == null)
                return NotFound("No data available.");

            return Ok(data);
        }
        [HttpGet("totalDataByDate")]
        public async Task<IActionResult> GetTotalEnvironmentDataByDate(DateTime date)
        {
            var data = await _environmentService.GetAverageEnvironmentData(date);
            return Ok(new { Humidity = data.Humidity, Temperature = data.Temperature, Brightness = data.Brightness, AirQuality = data.AirQuality });
        }
    }
}