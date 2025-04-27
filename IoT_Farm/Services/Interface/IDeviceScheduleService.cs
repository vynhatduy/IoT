namespace IoT_Farm.Services.Interface
{
    public interface IDeviceScheduleService
    {
        Task<DateTime?> GetLastSentAsync(string device, string area, string type);
        Task SetLastSentAsync(string device, string area, string type, DateTime time);
        Task<bool> IsDueScheduleAsync(string device, string area, string type, int? schedule, DateTime now);
    }
}
