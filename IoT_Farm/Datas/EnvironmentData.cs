using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{

    public class DailyData
    {
        [BsonId]
        public string Id { get; set; }
        public string Area { get; set; }
        public List<EnvironmentData> Records { get; set; } = new List<EnvironmentData>();

    }

    public class EnvironmentData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        public string DeviceId { get; set; }
        public string Area { get; set; }
        public double Temperature { get; set; }
        public double Humidity { get; set; }
        public double Brightness { get; set; }
        public double AirQuality { get; set; }
        private DateTime _timestamp = DateTime.UtcNow.AddHours(7);
        public DateTime Timestamp
        {
            get => _timestamp;
            set => _timestamp = (value == DateTime.MinValue ? DateTime.UtcNow.AddHours(7) : value);
        }
    }
}
