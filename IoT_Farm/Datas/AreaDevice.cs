using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class AreaDevice
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        [BsonRepresentation(BsonType.ObjectId)]
        public string AreaId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public List<string> DeviceIds { get; set; } = new();
    }


}
