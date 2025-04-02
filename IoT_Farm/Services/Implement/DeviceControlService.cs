using IoT_Farm.Datas;
using IoT_Farm.Models;
using IoT_Farm.Models.Request;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;
using IoT_Farm.Services.MQTT;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using System.Text.Json;

namespace IoT_Farm.Services.Implement
{
    public class DeviceControlService : IDeviceControlService
    {
        private readonly IMQTTService _mqttService;
        private readonly IDeviceControlRepository _repo;
        private readonly IHubContext<DeviceHub> _hub;

        public DeviceControlService(IMQTTService mqttService, IDeviceControlRepository repo, IHubContext<DeviceHub> hubContext)
        {
            _mqttService = mqttService;
            _repo = repo;
            _hub = hubContext;
        }

        public async Task<List<DeviceCommand>> GetCommandHistoryAsync(string deviceId)
        {
            var result = await _repo.GetCommandHistoryAsync(deviceId);
            return result;
        }
        public async Task<DeviceCommand> GetCommandHistoryLatestAsync(string deviceId)
        {
            var result = await _repo.GetCommandHistoryLatestAsync(deviceId);
            return result;
        }
        public async Task SaveCommandAsync(DeviceCommand command)
        {
            await _repo.SaveCommandAsync(command);
        }

        public async Task SendCommandAsync(DeviceRequestModel model)
        {
            var command = new DeviceCommand
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Light = model.Light,
                Fan = model.Fan,
                Pump = model.Pump,
                Heater = model.Heater,
                DeviceId = model.DeviceId,
                Timestamp = DateTime.UtcNow
            };

            await _repo.SaveCommandAsync(command);
            var sendData = new
            {
                light = model.Light,
                fan = model.Fan,
                pump = model.Pump,
                heater = model.Heater
            };
            var payload = JsonSerializer.Serialize(sendData);
            //Console.WriteLine($"Device service send data: {payload}");

            await _mqttService.PublishAsync($"Device/{command.DeviceId}/Control", payload);
        }
        public async Task HandleDeviceResponse(string topic, string payload)
        {
            var result = JsonSerializer.Deserialize<DeviceCommand>(payload);
            if (result != null)
            {
                // Lưu trạng thái thiết bị vào DB
                await _repo.SaveCommandAsync(result);

                // Gửi thông báo cho client qua SignalR
                await _hub.Clients.All.SendAsync("ReceiveDeviceStatus", result);
            }
        }

    }
}
