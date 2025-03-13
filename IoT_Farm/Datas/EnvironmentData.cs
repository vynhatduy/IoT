using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class EnvironmentData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Area { get; set; }
        public string SensorLocation { get; set; }
        public double Temperature { get; set; }
        public double Humidity { get; set; }
        public double Brightness { get; set; }
        public int AirQuality { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
