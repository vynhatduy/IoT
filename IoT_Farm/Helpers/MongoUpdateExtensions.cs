using IoT_Farm.Datas;
using MongoDB.Driver;

namespace IoT_Farm.Helpers
{
    public static class MongoUpdateExtensions
    {
        public static UpdateDefinition<DailyData> PushFilter(
            this UpdateDefinitionBuilder<DailyData> update,
            int hour,
            EnvironmentData data)
        {
            return Builders<DailyData>.Update
                .Push("Datas.$[elem].Records", data);
        }
    }
}
