using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class Camera
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string TypeConnect { get; set; }
        public string Area { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
    }
}
