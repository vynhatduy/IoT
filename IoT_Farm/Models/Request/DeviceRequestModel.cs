using Microsoft.AspNetCore.Mvc;

namespace IoT_Farm.Models.Request
{
    public class DeviceRequestModel
    {
        [FromForm]
        public string DeviceId { get; set; }

        [FromForm]
        public int Light { get; set; } = 0;

        [FromForm]
        public int Fan { get; set; } = 0;

        [FromForm]
        public int Pump { get; set; } = 0;

        [FromForm]
        public int Heater { get; set; } = 0;
    }
}
