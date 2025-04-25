using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace IoT_Farm.Controllers
{
    [Route("api/area")]
    [ApiController]
    public class AreaController : ControllerBase
    {
        private readonly IAreaService _areaService;

        public AreaController(IAreaService areaService)
        {
            _areaService = areaService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Area>>> GetAll()
        {
            var areas = await _areaService.GetAllAsync();
            return Ok(areas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Area>> GetById(string id)
        {
            var area = await _areaService.GetByIdAsync(id);
            if (area == null) return NotFound();
            return Ok(area);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AreaRequestModel area)
        {
            if (area == null) return BadRequest();
            var createdArea = await _areaService.CreateAsync(area);
            return createdArea.Status ? Ok(createdArea) : BadRequest(createdArea);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Area area)
        {
            if (area == null) return BadRequest();
            var updated = await _areaService.UpdateAsync(id, area);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var deleted = await _areaService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return Ok();
        }
    }
}
