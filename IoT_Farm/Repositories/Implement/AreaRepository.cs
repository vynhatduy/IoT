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
            try
            {
                if (string.IsNullOrEmpty(area.Id))
                {
                    area.Id = ObjectId.GenerateNewId().ToString();
                }

                await _databaseAdapter.AddAsync(area);
                return area;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<bool> DeleteAreaAsync(string id)
        {
            try
            {

                return await _databaseAdapter.DeleteAsync(id);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }
    }
}
