using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Interface;

namespace IoT_Farm.Repositories.Implement
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly IDatabaseAdapter<T> _databaseAdapter;

        public GenericRepository(DatabaseAdapterFactory adapterFactory)
        {
            _databaseAdapter = adapterFactory.CreateAdapter<T>(typeof(T).Name);
        }

        public async Task<T> GetByIdAsync(string id) =>
            await _databaseAdapter.GetByIdAsync(id);

        public async Task<IEnumerable<T>> GetAllAsync() =>
            await _databaseAdapter.GetAsync();

        public async Task AddAsync(T entity) =>
            await _databaseAdapter.AddAsync(entity);

        public async Task<bool> UpdateAsync(string id, T entity)
        {
            var existingEntity = await _databaseAdapter.GetByIdAsync(id);
            if (existingEntity == null) return false;

            await _databaseAdapter.UpdateAsync(id, entity);
            return true;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var existingEntity = await _databaseAdapter.GetByIdAsync(id);
            if (existingEntity == null) return false;

            await _databaseAdapter.DeleteAsync(id);
            return true;
        }
    }
}
