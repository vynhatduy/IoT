using IoT_Farm.Datas;

namespace IoT_Farm.Services.Interface
{
    public interface INotificationService
    {
        Task<List<Notification>> GetAllNotification();
        Task<bool> CreateNotificationAsync(Notification model);
        void UpdateStatus(string id);
    }
}
