namespace IoT_Farm.Services.SignalR
{
    public interface ISignalRService<T>
    {
        //method: tên event mà client đăng ký nhận.
        // message: dữ liệu bất kỳ (object).
        Task SendMessageToAllAsync(string method, T message);
        Task SendMessageToGroupAsync(string groupName, string method, T message);
        Task SendMessageToUserAsync(string userId, string method, T message);
    }
}
