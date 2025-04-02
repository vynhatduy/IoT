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
        public DeviceType Type { get; set; }

    }
    public enum DeviceType
    {
        ESP8266,
        ESP32,
        ARDUINO,
    }
}
