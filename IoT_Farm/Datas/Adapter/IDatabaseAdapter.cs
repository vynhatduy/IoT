using System.Linq.Expressions;

namespace IoT_Farm.Datas.Adapter
{
    public interface IDatabaseAdapter<T>
    {
        Task<List<T>> GetAsync();
        Task<T> GetByIdAsync(string id);
        Task<T> FindOneAsync(Expression<Func<T, bool>> filter);
        Task AddAsync(T item);
        Task UpdateAsync(string id, T item);
        Task DeleteAsync(string id);
    }
}
