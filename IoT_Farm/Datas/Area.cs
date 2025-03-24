using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class Area
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Topic { get; set; }
    }
}
