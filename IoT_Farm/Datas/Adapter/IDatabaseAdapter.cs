using MongoDB.Driver;
using System.Linq.Expressions;

namespace IoT_Farm.Datas.Adapter
{
    public interface IDatabaseAdapter<T> where T : class
    {
        Task<List<T>> GetAsync(Expression<Func<T, bool>>? filter = null);
        Task<T?> FindOneAsync(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IOrderedQueryable<T>>? sort = null);
        Task<T?> GetByIdAsync(string id);
        Task<bool> AddAsync(T item);
        Task<bool> UpdateAsync(string id, T item);
        Task<bool> DeleteAsync(string id);
        Task<bool> UpdateOneAsync(FilterDefinition<T> filter, UpdateDefinition<T> update, UpdateOptions? options = null);
        Task<List<TOutput>> AggregateAsync<TOutput>(PipelineDefinition<T, TOutput> pipeline);
        Task<bool> ExistsAsync(FilterDefinition<T> filter);
        Task<bool> InsertOneAsync(T document);
        Task<T?> FindOneAsync(FilterDefinition<T> filter);
        Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate);
        Task<bool> ReplaceOneAsync(FilterDefinition<T> filter, T model);
        Task<long> GetCount();
        Task<long> CountDocumentsAsync(FilterDefinition<T> filter);
    }
}
