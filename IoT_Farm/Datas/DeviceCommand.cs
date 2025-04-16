using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class DeviceCommand
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("DeviceId")]
        public string DeviceId { get; set; }

        [BsonElement("Light")]
        public int Light { get; set; }

        [BsonElement("Fan")]
        public int Fan { get; set; }

        [BsonElement("Pump")]
        public int Pump { get; set; }

        [BsonElement("Heater")]
        public int Heater { get; set; }

        [BsonElement("Timestamp")]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow.AddHours(7);
    }
}
