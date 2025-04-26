using IoT_Farm.Datas;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;
using MongoDB.Bson;

namespace IoT_Farm.Services.Implement
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _repo;

        public NotificationService(INotificationRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> CreateNotificationAsync(Notification model)
        {
            try
            {
                model.Id = ObjectId.GenerateNewId().ToString();
                return await _repo.CreateNotificationAsync(model);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public Task<List<Notification>> GetAllNotification()
        {
            return _repo.GetAllNotification();
        }

        public async void UpdateStatus(string id)
        {
            await _repo.UpdateStatus(id);
        }
    }
}
