
using Dapper;
using IoT_Farm.Helpers;
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

        public async Task<List<T>> GetAsync() =>
            (await _dbConnection.QueryAsync<T>($"SELECT * FROM {_tableName}")).AsList();

        public async Task<T> FindOneAsync(Expression<Func<T, bool>> filter)
        {
            var sqlBuilder = new SqlExpressionBuilder<T>();
            var whereClause = sqlBuilder.BuildWhereClause(filter);
            var query = $"SELECT * FROM {_tableName} WHERE {whereClause} LIMIT 1";
            return await _dbConnection.QueryFirstOrDefaultAsync<T>(query);
        }
        public async Task<T> GetByIdAsync(string id) =>
            await _dbConnection.QueryFirstOrDefaultAsync<T>($"SELECT * FROM {_tableName} WHERE Id = @Id", new { Id = id });

        public async Task AddAsync(T item) =>
            await _dbConnection.ExecuteAsync($"INSERT INTO {_tableName} VALUES (@Entity)", new { Entity = item });

        public async Task UpdateAsync(string id, T item) =>
            await _dbConnection.ExecuteAsync($"UPDATE {_tableName} SET @Entity WHERE Id = @Id", new { Entity = item, Id = id });

        public async Task DeleteAsync(string id) =>
            await _dbConnection.ExecuteAsync($"DELETE FROM {_tableName} WHERE Id = @Id", new { Id = id });

        public Task<List<T>> GetAsync(Expression<Func<T, bool>>? filter = null)
        {
            throw new NotImplementedException();
        }

        public Task<T?> FindOneAsync(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IOrderedQueryable<T>>? sort = null)
        {
            throw new NotImplementedException();
        }

        public Task UpdateOneAsync(FilterDefinition<T> filter, UpdateDefinition<T> update, UpdateOptions options)
        {
            throw new NotImplementedException();
        }

        Task<UpdateResult> IDatabaseAdapter<T>.UpdateOneAsync(FilterDefinition<T> filter, UpdateDefinition<T> update, UpdateOptions options)
        {
            throw new NotImplementedException();
        }

        public Task<List<TOutput>> AggregateAsync<TOutput>(PipelineDefinition<T, TOutput> pipeline)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExistsAsync(FilterDefinition<T> filter)
        {
            throw new NotImplementedException();
        }

        public Task InsertOneAsync(T document)
        {
            throw new NotImplementedException();
        }

        public Task<T?> FindOneAsync(FilterDefinition<T> filter)
        {
            throw new NotImplementedException();
        }

        public Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ReplaceOneAsync(FilterDefinition<T> filter, T model)
        {
            throw new NotImplementedException();
        }
    }

}
