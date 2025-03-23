using MongoDB.Driver;

namespace IoT_Farm.Datas.Adapter
{
    public class EnvironmentDataAdapter
    {
        private readonly IMongoCollection<EnvironmentData> _collection;

        public EnvironmentDataAdapter(IMongoDatabase database)
        {
            _collection = database.GetCollection<EnvironmentData>("EnvironmentData");
        }

        public async Task<List<EnvironmentData>> GetEnvironmentDataAsync(FilterDefinition<EnvironmentData> filter)
        {
            try
            {
                // Fetch the data from the MongoDB collection based on the filter
                return await _collection.Find(filter).ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching data: {ex.Message}");
                return new List<EnvironmentData>();
            }
        }
    }

}
