using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class DeviceDetail
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    [BsonRepresentation(BsonType.ObjectId)]
    public string DeviceId { get; set; }

    public string Name { get; set; }

    public DeviceCategory Category { get; set; }

    public string Topic { get; set; }
}

public enum DeviceCategory
{
    Collector,
    Response
}
