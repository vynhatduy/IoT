using IoT_Farm.Helpers;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace IoT_Farm.Datas
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("first_name")]
        public string FirstName { get; set; }
        [BsonElement("last_name")]
        public string LastName { get; set; }
        [BsonElement("email")]
        public string Email { get; set; }
        [BsonElement("PasswordHash")]
        [JsonIgnore]
        public string PasswordHash { get; set; }
        [BsonElement("role")]
        public string Role { get; set; }
        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [BsonElement("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        [BsonElement("address")]
        public string Address { get; set; }

        [BsonElement("phone")]
        public string PhoneNumber { get; set; }

        public void SetPasswordHash(string password)
        {
            PasswordHash = Hasher.HashPasswordHash(password);
        }
        public bool VerifyPasswordHash(string password)
        {
            return Hasher.VerifyPasswordHash(password, PasswordHash);
        }
        public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}