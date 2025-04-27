using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Services.Interface;
using System.Text.Json;

namespace IoT_Farm.Services
{
    public class EnvironmentMonitorService
    {
        private readonly IWeatherDeviceConfigService _deviceConfigService;
        private readonly IDeviceControlService _commandService;
        private readonly ILogger<EnvironmentMonitorService> _logger;
        private readonly INotificationService _notifiCation;

        public EnvironmentMonitorService(
        IWeatherDeviceConfigService deviceConfigService,
        IDeviceControlService commandService,
        ILogger<EnvironmentMonitorService> logger,
        INotificationService notifiCation)
        {
            _deviceConfigService = deviceConfigService;
            _commandService = commandService;
            _logger = logger;
            _notifiCation = notifiCation;
        }
        public async Task CheckAndTriggerAsync(EnvironmentData data)
        {
            var configs = await _deviceConfigService.GetByAreaAsync(data.Area);

            for (int i = 0; i <= configs.Count - 1; i++)
            {
                var config = configs[i];
                if (!config.Status) continue;
                var payload = new DeviceRequestModel
                {
                    Area = config.Area,
                    DeviceId = config.DeviceName,
                    Light = data.Light > config.Conditions.Light ? 1 : 0,
                    Heater = data.Temperature < config.Conditions.Heater ? 1 : 0,
                    Pump = data.Temperature > config.Conditions.Pump ? 1 : 0,
                    Fan = (
                        data.AirQuality > config.Conditions.Fan.Aqi ||
                        data.Temperature > config.Conditions.Fan.Temperature ||
                        data.Humidity > config.Conditions.Fan.Humidity
                    ) ? 1 : 0
                };
                var result = await _commandService.SendCommandAsync(payload);

                if (result.Status)
                {
                    var details = new List<string>();

                    if (payload.Light == 1) details.Add("Đèn: Bật");
                    else details.Add("Đèn: Tắt");

                    if (payload.Fan == 1) details.Add("Quạt: Bật");
                    else details.Add("Quạt: Tắt");

                    if (payload.Pump == 1) details.Add("Máy bơm: Bật");
                    else details.Add("Máy bơm: Tắt");

                    if (payload.Heater == 1) details.Add("Máy sưởi: Bật");
                    else details.Add("Máy sưởi: Tắt");

                    var newItem = new Notification
                    {
                        CreateAt = DateTime.Now,
                        Detail = $"Điều khiển thiết bị:\n{string.Join("\n", details)}",
                        Status = false,
                        Title = "Điều khiển thiết bị"
                    };

                    await _notifiCation.CreateNotificationAsync(newItem);
                }


                _logger.LogInformation($"[Trigger] Sent command to device {payload.DeviceId}: {JsonSerializer.Serialize(payload)}");
            }
        }
    }
}