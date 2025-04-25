using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class DeviceConfigWeather
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Area { get; set; }
        public string DeviceName { get; set; }
        public string Name { get; set; }
        public Conditions Conditions { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public bool Status { get; set; } = true;

    }
    public class Conditions
    {
        public ConditionFan Fan { get; set; }
        public double Heater { get; set; }
        public double Light { get; set; }
        public double Pump { get; set; }
    }
    public class ConditionFan
    {
        public double Aqi { get; set; }
        public double Humidity { get; set; }
        public double Temperature { get; set; }
    }
}
