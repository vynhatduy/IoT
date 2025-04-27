using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Services.Interface;
using System.Text.Json;

namespace IoT_Farm.Services.Background
{
    public class ScheduleWorker : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<ScheduleWorker> _logger;

        public ScheduleWorker(IServiceProvider serviceProvider, ILogger<ScheduleWorker> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _serviceProvider.CreateScope();
                var configService = scope.ServiceProvider.GetRequiredService<ICalenderDeviceConfigService>();
                var scheduleService = scope.ServiceProvider.GetRequiredService<IDeviceScheduleService>();
                var mqttCommandService = scope.ServiceProvider.GetRequiredService<IDeviceControlService>();

                var now = DateTime.Now;
                var currentTime = now.TimeOfDay;
                var configs = await configService.GetActiveConfigs(now);

                foreach (var config in configs)
                {
                    int? light = null, fan = null, pump = null, heater = null;

                    foreach (var type in new[] { "Light", "Fan", "Pump", "Heater" })
                    {
                        var deviceConfig = GetDeviceConfigByType(config, type);
                        if (deviceConfig != null)
                        {
                            bool isInTime = IsInTimeRange(deviceConfig.Time.Start.ToString(), deviceConfig.Time.End.ToString(), currentTime);

                            if (isInTime)
                            {
                                // Nếu đang trong khung giờ, kiểm tra xem có đến thời điểm gửi chưa
                                if (await scheduleService.IsDueScheduleAsync(config.Device, config.Area, type, deviceConfig.Schedule?.Hours, now))
                                {
                                    switch (type)
                                    {
                                        case "Light": light = 1; break;
                                        case "Fan": fan = 1; break;
                                        case "Pump": pump = 1; break;
                                        case "Heater": heater = 1; break;
                                    }
                                    await scheduleService.SetLastSentAsync(config.Device, config.Area, type, now);
                                }
                            }
                            else
                            {
                                // Ngoài khung giờ -> luôn tắt thiết bị
                                switch (type)
                                {
                                    case "Light": light = 0; break;
                                    case "Fan": fan = 0; break;
                                    case "Pump": pump = 0; break;
                                    case "Heater": heater = 0; break;
                                }
                            }
                        }
                    }

                    var request = new DeviceRequestModel
                    {
                        Area = config.Area,
                        DeviceId = config.Device,
                        Light = light,
                        Fan = fan,
                        Pump = pump,
                        Heater = heater
                    };

                    var result = await mqttCommandService.SendCommandAsync(request);

                    if (result.Status)
                    {
                        _logger.LogInformation($"Gửi dữ liệu thành công cho thiết bị {config.Device} với payload {JsonSerializer.Serialize(result.Data)}");
                    }
                    else
                    {
                        _logger.LogError($"Gửi dữ liệu KHÔNG thành công cho thiết bị {config.Device}. Lý do: {result.Message}");
                    }
                }
                // 1 phút lặp lại
                await Task.Delay(TimeSpan.FromMinutes(0.5), stoppingToken);
            }
        }


        private bool IsInTimeRange(string start, string end, TimeSpan now)
        {
            if (TimeSpan.TryParse(start, out var startTime) && TimeSpan.TryParse(end, out var endTime))
            {
                if (startTime <= endTime)
                {
                    return now >= startTime && now <= endTime;
                }
                else
                {
                    return now >= startTime || now <= endTime;
                }
            }
            return false;
        }

        private DeviceSchedule? GetDeviceConfigByType(CalenderDeviceConfig config, string type)
        {
            return type switch
            {
                "Light" => config.Light,
                "Fan" => config.Fan,
                "Pump" => config.Pump,
                "Heater" => config.Heater,
                _ => null
            };
        }

    }
}
