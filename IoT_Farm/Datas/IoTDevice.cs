using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class IoTDevice
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Name { get; set; }
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
