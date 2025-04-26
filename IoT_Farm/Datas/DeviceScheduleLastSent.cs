using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class DeviceScheduleLastSent
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Device { get; set; }       // ESP-123123
        public string Area { get; set; }         // KV001

        public string Type { get; set; }         // "light", "fan", "pump", "heater"

        public DateTime LastSent { get; set; } = DateTime.Now;
    }
}
