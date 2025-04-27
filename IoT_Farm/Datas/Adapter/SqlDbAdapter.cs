using MongoDB.Driver;
using System.Data;
using System.Data.SqlClient;
using System.Linq.Expressions;

namespace IoT_Farm.Datas.Adapter
{

    public class SqlDbAdapter<T> : IDatabaseAdapter<T> where T : class
    {
        private readonly IDbConnection _dbConnection;
        private readonly string _tableName;

        public SqlDbAdapter(string connectionString, string tableName)
        {
            _dbConnection = new SqlConnection(connectionString);
            _tableName = tableName;
        }

        public Task<bool> AddAsync(T item)
        {
            throw new NotImplementedException();
        }

        public Task<List<TOutput>> AggregateAsync<TOutput>(PipelineDefinition<T, TOutput> pipeline)
        {
            throw new NotImplementedException();
        }

        public Task<long> CountDocumentsAsync(FilterDefinition<T> filter)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExistsAsync(FilterDefinition<T> filter)
        {
            throw new NotImplementedException();
        }

        public Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<T?> FindOneAsync(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IOrderedQueryable<T>>? sort = null)
        {
            throw new NotImplementedException();
        }

        public Task<T?> FindOneAsync(FilterDefinition<T> filter)
        {
            throw new NotImplementedException();
        }

        public Task<List<T>> GetAsync(Expression<Func<T, bool>>? filter = null)
        {
            throw new NotImplementedException();
        }

        public Task<T?> GetByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<long> GetCount()
        {
            throw new NotImplementedException();
        }

        public Task<bool> InsertOneAsync(T document)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ReplaceOneAsync(FilterDefinition<T> filter, T model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(string id, T item)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateOneAsync(FilterDefinition<T> filter, UpdateDefinition<T> update, UpdateOptions? options = null)
        {
            throw new NotImplementedException();
        }
    }

}
