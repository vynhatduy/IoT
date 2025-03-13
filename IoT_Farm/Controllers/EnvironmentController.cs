using IoT_Farm.Services.Implement;
using Microsoft.AspNetCore.Mvc;

namespace IoT_Farm.Controllers
{
    [Route("api/environment")]
    [ApiController]
    public class EnvironmentController : ControllerBase
    {
        private readonly EnvironmentService _environmentService;
        public EnvironmentController(EnvironmentService environmentService)
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
        public async Task<IActionResult> GetLatestData()
        {
            var data = await _environmentService.GetLatestEnvironmentData();
            if (data == null)
                return NotFound("No data available.");

            return Ok(data);
        }
    }
}