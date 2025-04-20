using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class Farm
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("area")]
        public double Area { get; set; }

        [BsonElement("address")]
        public string Address { get; set; }

        [BsonElement("coordinates")]
        public List<double> Coordinates { get; set; }

        [BsonElement("images")]
        public List<Image> Images { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; }

        [BsonElement("__v")]
        public int Version { get; set; }


    }

    public class Image
    {
        [BsonElement("url")]
        public string Url { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }
    }
}