using IoT_Farm.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace IoT_Farm.Controllers
{
    [Route("api/notification")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _service;

        public NotificationController(INotificationService service)
        {
            _service = service;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllNotification();
            return result != null ? Ok(result) : NotFound();
        }
        [HttpPut("update-status")]
        public IActionResult UpdateStatus(string id)
        {
            _service.UpdateStatus(id);
            return Ok();
        }
    }
}
