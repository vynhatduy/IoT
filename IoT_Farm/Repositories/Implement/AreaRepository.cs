using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Interface;
using MongoDB.Bson;

namespace IoT_Farm.Repositories.Implement
{
    public class AreaRepository : GenericRepository<Area>, IAreaRepository
    {
        public AreaRepository(DatabaseAdapterFactory adapterFactory) : base(adapterFactory)
        {
        }

        public async Task<List<Area>> GetAllAsync()
        {
            var areas = await _databaseAdapter.GetAsync();
            return areas.ToList();
        }

        public async Task<Area> CreateAsync(Area area)
        {
            if (string.IsNullOrEmpty(area.Id))
            {
                area.Id = ObjectId.GenerateNewId().ToString();
            }

            await _databaseAdapter.AddAsync(area);
            return area;
        }
    }
}
