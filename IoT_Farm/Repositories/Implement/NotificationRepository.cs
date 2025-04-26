using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Repositories.Interface;

namespace IoT_Farm.Repositories.Implement
{
    public class NotificationRepository : GenericRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(DatabaseAdapterFactory adapterFactory) : base(adapterFactory)
        {
        }

        public async Task<bool> CreateNotificationAsync(Notification model)
        {
            try
            {
                model.Status = false;
                return await _databaseAdapter.AddAsync(model);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<List<Notification>> GetAllNotification()
        {
            return await _databaseAdapter.GetAsync(_ => true);
        }

        public async Task UpdateStatus(string id)
        {
            try
            {
                var item = await _databaseAdapter.FindOneAsync(x => x.Id == id);
                if (item == null)
                {
                    return;
                }
                item.Status = true;
                var result = await _databaseAdapter.UpdateAsync(id, item);
                if (result == false)
                {
                    Console.WriteLine("Hiện tại không thể cập nhật");
                    return;
                }
                return;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return;
            }

        }
    }
}
