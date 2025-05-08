namespace IoT_Farm.Services.SignalR
{
    public interface ISignalRService<T>
    {
        Task SendMessageToAllAsync(string method, T message);
        Task SendMessageToGroupAsync(string groupName, string method, T message);
        Task SendMessageToUserAsync(string userId, string method, T message);
    }
}
