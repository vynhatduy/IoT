using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace IoT_Farm.Datas
{
    public class AreaDevice
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        public string AreaId { get; set; }

        public string Topic { get; set; }
        public List<Device> DeviceDetails { get; set; }
    }

    public enum DeviceCategory
    {
        Collector,
        Response
    }
}
