namespace IoT_Farm.Models.Request
{
    public class DeviceRequestModel
    {
        public string Area { get; set; } = null!;
        public string DeviceId { get; set; } = null!;

        public int? Light { get; set; }

        public int? Fan { get; set; }

        public int? Pump { get; set; }

        public int? Heater { get; set; }
    }
}
