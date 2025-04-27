namespace IoT_Farm.Models.Request
{
    public class IoTDeviceRequestModel
    {
        public string DeviceID { get; set; }
        public string KhuVuc { get; set; }
        public int? WiFiSignal { get; set; } // Có thể null
        public string Status { get; set; }
        public string IpAddress { get; set; }
        public int? Uptime { get; set; } // Có thể null
        public string EspModel { get; set; }
        public string FirmwareVersion { get; set; }
        public int? Light { get; set; } // Có thể null
        public int? Fan { get; set; } // Có thể null
        public int? Pump { get; set; } // Có thể null
        public int? Heater { get; set; } // Có thể null
    }
}
