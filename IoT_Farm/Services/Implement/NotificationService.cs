using IoT_Farm.Datas;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;
using IoT_Farm.Services.SignalR;
using MongoDB.Bson;

namespace IoT_Farm.Services.Implement
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _repo;
        private readonly ISignalRService<Notification> _signalR;

        public NotificationService(INotificationRepository repo, ISignalRService<Notification> signalR)
        {
            _repo = repo;
            _signalR = signalR;
        }

        public async Task<bool> CreateNotificationAsync(Notification model)
        {
            try
            {
                model.Id = ObjectId.GenerateNewId().ToString();
                var result = await _repo.CreateNotificationAsync(model);
                if (result)
                {
                    await _signalR.SendMessageToAllAsync("Notification", model);
                }
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<List<Notification>> GetAllNotification()
        {
            var result = await _repo.GetAllNotification();
            return result.OrderByDescending(x => x.CreateAt).ToList();
        }

        public async void UpdateStatus(string id)
        {
            await _repo.UpdateStatus(id);
        }
    }
}
