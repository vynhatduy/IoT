using MongoDB.Driver;

namespace IoT_Farm.Datas.Adapter
{
    public class DatabaseAdapterFactory
    {
        private readonly IMongoDatabase _mongoDatabase;
        private readonly string _sqlConnection;
        private readonly string _dbType;

        public DatabaseAdapterFactory(IMongoDatabase mongoDatabase, string sqlConnection, string dbType)
        {
            _mongoDatabase = mongoDatabase;
            _sqlConnection = sqlConnection;
            _dbType = dbType;
        }

        public IDatabaseAdapter<T> CreateAdapter<T>(string collectionOrTableName) where T : class
        {
            return _dbType.ToLower() switch
            {
                "mongo" => new MongoDbAdapter<T>(_mongoDatabase, collectionOrTableName),
                "sql" => new SqlDbAdapter<T>(_sqlConnection, collectionOrTableName),
                _ => throw new Exception("Unsupported database type")
            };
        }
    }
}
