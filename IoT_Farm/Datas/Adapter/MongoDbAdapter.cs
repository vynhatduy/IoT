using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace IoT_Farm.Datas.Adapter
{
    public class MongoDbAdapter<T> : IDatabaseAdapter<T> where T : class
    {
        private IMongoCollection<T> _collection;

        public MongoDbAdapter(IMongoDatabase database, string collectionName)
        {
            _collection = database.GetCollection<T>(collectionName);
        }
        public async Task<T> FindOneAsync(Expression<Func<T, bool>> filter) =>
            await _collection.Find(filter).FirstOrDefaultAsync();

        public async Task AddAsync(T item) =>
            await _collection.InsertOneAsync(item);


        public async Task DeleteAsync(string id) =>
            await _collection.DeleteOneAsync(Builders<T>.Filter.Eq("_id", new ObjectId(id)));

        public async Task<List<T>> GetAsync() =>
            await _collection.Find(_ => true).ToListAsync();

        public async Task<T> GetByIdAsync(string id) =>
            await _collection.Find(Builders<T>.Filter.Eq("_id", new ObjectId(id))).FirstOrDefaultAsync();

        public async Task UpdateAsync(string id, T item) =>
            await _collection.ReplaceOneAsync(Builders<T>.Filter.Eq("_id", new ObjectId(id)), item);
    }
}
