namespace IoT_Farm.Models.Request
{
    public class DeviceRequestModel
    {
        public string DeviceId { get; set; }

        public int? Light { get; set; }

        public int? Fan { get; set; }

        public int? Pump { get; set; }

        public int? Heater { get; set; }
    }
}
