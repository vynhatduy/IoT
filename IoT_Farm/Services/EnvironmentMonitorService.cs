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
        public EnvironmentMonitorService(
        IWeatherDeviceConfigService deviceConfigService,
        IDeviceControlService commandService,
        ILogger<EnvironmentMonitorService> logger)
        {
            _deviceConfigService = deviceConfigService;
            _commandService = commandService;
            _logger = logger;
        }
        public async Task CheckAndTriggerAsync(EnvironmentData data)
        {
            var configs = await _deviceConfigService.GetByAreaAsync(data.Area);
            foreach (var config in configs)
            {
                if (!config.Status) continue;

                var payload = new DeviceRequestModel
                {
                    Area = config.Area,
                    DeviceId = config.DeviceName,
                    Light = data.Light > config.Conditions.Light ? 1 : 0,
                    Heater = data.Temperature < config.Conditions.Heater ? 1 : 0,
                    Pump = data.Temperature < config.Conditions.Pump ? 1 : 0,
                    Fan = (
                        data.AirQuality > config.Conditions.Fan.Aqi ||
                        data.Temperature > config.Conditions.Fan.Temperature ||
                        data.Humidity > config.Conditions.Fan.Humidity
                    ) ? 1 : 0
                };

                if (payload.Light == 1 || payload.Fan == 1 || payload.Pump == 1 || payload.Heater == 1)
                {
                    var result = await _commandService.SendCommandAsync(payload);
                    _logger.LogInformation($"[Trigger] Sent command to device {payload.DeviceId}: {JsonSerializer.Serialize(payload)}");
                }
            }
        }
    }
}