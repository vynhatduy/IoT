using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace IoT_Farm.Controllers
{
    [Route("api/camera")]
    [ApiController]
    public class CameraController : ControllerBase
    {
        private readonly ICameraService _service;

        public CameraController(ICameraService service)
        {
            _service = service;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAllCamera()
        {
            var result = await _service.GetAllCameraAsync();
            return result != null || result.Count < 1 ? Ok(result) : NotFound();
        }
        [HttpGet("byId")]
        public async Task<IActionResult> GetCameraById(string id)
        {
            var result = await _service.GetCameraAsync(id);
            return result != null ? Ok(result) : NotFound();
        }
        [HttpGet("byArea")]
        public async Task<IActionResult> GetCameraByArea(string area)
        {
            var result = await _service.GetCameraByArea(area);
            return result != null ? Ok(result) : NotFound();
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateCamera(CameraRequestModel model)
        {
            var result = await _service.CreateCameraAsync(model);
            return result.Status ? Ok(result) : NotFound();
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateCamera(Camera model)
        {
            var result = await _service.UpdateCameraAsync(model);
            return result.Status ? Ok(result) : NotFound();
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteCamera(string id)
        {
            var result = await _service.DeleteCameraAsync(id);
            return result.Status ? Ok(result) : NotFound();
        }


    }

}