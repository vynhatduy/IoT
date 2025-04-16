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
            var filter = Builders<T>.Filter.Eq("_id", id);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddAsync(T item)
        {
            await _collection.InsertOneAsync(item);
        }

        public async Task UpdateAsync(string id, T item)
        {
            await _collection.ReplaceOneAsync(Builders<T>.Filter.Eq("_id", id), item);
        }

        public async Task DeleteAsync(string id)
        {
            await _collection.DeleteOneAsync(Builders<T>.Filter.Eq("_id", id));
        }

        public async Task<UpdateResult> UpdateOneAsync(FilterDefinition<T> filter, UpdateDefinition<T> update, UpdateOptions? options = null)
        {
            return await _collection.UpdateOneAsync(filter, update, options);
        }

        public async Task<List<TOutput>> AggregateAsync<TOutput>(PipelineDefinition<T, TOutput> pipeline)
        {
            return await _collection.Aggregate(pipeline).ToListAsync();
        }

        public async Task<bool> ExistsAsync(FilterDefinition<T> filter)
        {
            return await _collection.Find(filter).AnyAsync();
        }

        public async Task InsertOneAsync(T document)
        {
            await _collection.InsertOneAsync(document);
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
            Console.WriteLine($"MatchedCount: {result.MatchedCount}, ModifiedCount{result.ModifiedCount}");
            return result.ModifiedCount > 0;
        }
    }
}
