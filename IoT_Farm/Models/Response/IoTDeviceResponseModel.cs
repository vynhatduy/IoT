namespace IoT_Farm.Models.Response
{
    public class IoTDeviceResponseModel
    {
        public string DeviceID { get; set; }
        public string KhuVuc { get; set; }
        public string Status { get; set; }
        public string EspModel { get; set; }
        public int? Light { get; set; }
        public int? Fan { get; set; }
        public int? Pump { get; set; }
        public int? Heater { get; set; }
        public string? Name { get; set; }
    }
}
