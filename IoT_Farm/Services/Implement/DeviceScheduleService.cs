using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;

namespace IoT_Farm.Services.Implement
{
    public class DeviceScheduleService : IDeviceScheduleService
    {
        private readonly IDeviceScheduleRepository _repository;

        public DeviceScheduleService(IDeviceScheduleRepository repository)
        {
            _repository = repository;
        }

        public async Task<DateTime?> GetLastSentAsync(string device, string area, string type)
        {
            var result = await _repository.GetLastSentAsync(device, area, type);
            return result?.LastSent;
        }

        public async Task<bool> IsDueScheduleAsync(string device, string area, string type, int? schedule, DateTime now)
        {
            if (schedule == null) return true;

            var lastSent = await GetLastSentAsync(device, area, type);
            return lastSent == null || (now - lastSent.Value).TotalMinutes >= schedule.Value;
        }

        public async Task SetLastSentAsync(string device, string area, string type, DateTime time)
        {
            await _repository.UpdateLastSentAsync(device, area, type, time);
        }
    }
}
