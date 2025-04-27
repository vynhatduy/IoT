using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class Notification
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        public string Title { get; set; }
        public string Detail { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public bool Status { get; set; } = true;
    }
}
