using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;

namespace IoT_Farm.Repositories.Implement
{
    public class UserRepository : GenericRepository<User>
    {
        public UserRepository(DatabaseAdapterFactory adapterFactory) : base(adapterFactory)
        {
        }

        public async Task<User> GetByUsernameAsync(string username)
        {
            return await _databaseAdapter.FindOneAsync(u => u.Email == username || u.PhoneNumber == username);
        }
    }
}
