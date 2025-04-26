using IoT_Farm.Datas;

namespace IoT_Farm.Repositories.Interface
{
    public interface INotificationRepository : IGenericRepository<Notification>
    {
        Task<List<Notification>> GetAllNotification();
        Task<bool> CreateNotificationAsync(Notification model);
        Task UpdateStatus(string id);
    }
}
