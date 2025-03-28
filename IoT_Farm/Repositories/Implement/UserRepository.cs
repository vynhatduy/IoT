using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using MongoDB.Driver;

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
        public async Task<User> GetUserById(string id)
        {
            return await _databaseAdapter.FindOneAsync(u => u.Id == id);
        }
        public async Task UpdateRefreshTokenAsync(string userId, RefreshToken refreshToken)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
            var update = Builders<User>.Update.Push(u => u.RefreshTokens, refreshToken);

            await _databaseAdapter.UpdateOneAsync(filter, update);
        }

    }
}
