

namespace IoT_Farm.Services.SignalR
{
    public class SignalRService<T> : ISignalRService<T>
    {
        public SignalRService()
        {
        }

        public Task SendMessageToAllAsync(string method, T message)
        {
            throw new NotImplementedException();
        }

        public Task SendMessageToGroupAsync(string groupName, string method, T message)
        {
            throw new NotImplementedException();
        }

        public Task SendMessageToUserAsync(string userId, string method, T message)
        {
            throw new NotImplementedException();
        }
    }
}
