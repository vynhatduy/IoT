using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class Device
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        public string Name { get; set; }
        public string NameDevice { get; set; }
        public DeviceType Type { get; set; }
        public List<Dictionary<string, bool>> Details { get; set; }

    }
    public enum DeviceType
    {
        ESP8266,
        ESP32,
        ARDUINO,
    }
    public static class DeviceDetail
    {
        public const string Light = "light";
        public const string Fan = "fan";
        public const string Pump = "pump";
        public const string Heater = "heater";
    }
}
