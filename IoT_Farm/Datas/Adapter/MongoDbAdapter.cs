using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq.Expressions;
namespace IoT_Farm.Datas.Adapter
{
    public class MongoDbAdapter<T> : IDatabaseAdapter<T> where T : class
    {
        private readonly IMongoCollection<T> _collection;
        public MongoDbAdapter(IMongoDatabase database, string collectionName)
        {
            _collection = database.GetCollection<T>(collectionName);
        }
        public async Task<List<T>> GetAsync(Expression<Func<T, bool>>? filter = null)
        {
            return await _collection.Find(filter ?? (_ => true)).Limit(1000).ToListAsync();
        }
        public async Task<T?> FindOneAsync(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IOrderedQueryable<T>>? sort = null)
        {
            var query = _collection.AsQueryable().Where(filter);
            if (sort != null)
            {
                query = sort(query);
            }
            return query.FirstOrDefault();
        }
        public async Task<T?> GetByIdAsync(string id)
        {
            var objectId = ObjectId.Parse(id);
            var filter = Builders<T>.Filter.Eq("_id", id);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task<bool> AddAsync(T item)
        {
            await _collection.InsertOneAsync(item);
            return true; // Insert operations always create a new document, so return true
        }
        public async Task<bool> UpdateAsync(string id, T item)
        {
            var objectId = new ObjectId(id);
            var result = await _collection.ReplaceOneAsync(Builders<T>.Filter.Eq("_id", objectId), item);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var objectId = new ObjectId(id);
            var result = await _collection.DeleteOneAsync(Builders<T>.Filter.Eq("_id", objectId));
            return result.DeletedCount > 0;
        }
        public async Task<bool> UpdateOneAsync(FilterDefinition<T> filter, UpdateDefinition<T> update, UpdateOptions? options = null)
        {
            var result = await _collection.UpdateOneAsync(filter, update, options);
            return result.ModifiedCount > 0;
        }
        public async Task<List<TOutput>> AggregateAsync<TOutput>(PipelineDefinition<T, TOutput> pipeline)
        {
            return await _collection.Aggregate(pipeline).ToListAsync();
        }
        public async Task<bool> ExistsAsync(FilterDefinition<T> filter)
        {
            return await _collection.Find(filter).AnyAsync();
        }
        public async Task<bool> InsertOneAsync(T document)
        {
            await _collection.InsertOneAsync(document);
            return true; // Insert operations always create a new document, so return true
        }
        public async Task<T?> FindOneAsync(FilterDefinition<T> filter)
        {
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _collection.Find(predicate).ToListAsync();
        }
        public async Task<bool> ReplaceOneAsync(FilterDefinition<T> filter, T model)
        {
            var result = await _collection.ReplaceOneAsync(filter, model);
            return result.ModifiedCount > 0;
        }
        public async Task<long> GetCount()
        {
            return await _collection.CountDocumentsAsync(FilterDefinition<T>.Empty);
        }

    }
}