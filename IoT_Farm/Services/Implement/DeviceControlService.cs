using IoT_Farm.Datas;
using IoT_Farm.Models;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;
using IoT_Farm.Services.MQTT;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace IoT_Farm.Services.Implement
{
    public class DeviceControlService : IDeviceControlService
    {
        private readonly IMQTTService _mqttService;
        private readonly IDeviceControlRepository _repo;
        private readonly IHubContext<DeviceHub> _hub;
        private readonly IAreaDeviceRepository _areaDeviceRepo;

        public DeviceControlService(IMQTTService mqttService, IDeviceControlRepository repo, IAreaDeviceRepository areaDeviceRepo, IHubContext<DeviceHub> hubContext)
        {
            _mqttService = mqttService;
            _repo = repo;
            _hub = hubContext;
            _areaDeviceRepo = areaDeviceRepo;
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

        public async Task<ResultModel> SendCommandAsync(DeviceRequestModel model)
        {

            try
            {
                var sendData = new
                {
                    light = model.Light,
                    fan = model.Fan,
                    pump = model.Pump,
                    heater = model.Heater
                };
                var payload = JsonSerializer.Serialize(sendData);

                //await _mqttService.PublishAsync($"Device/{model.DeviceId}/Control", payload);
                Console.WriteLine("Đã gửi data đến thiết bị");
                var result = await _areaDeviceRepo.SaveDeviceControlAsync(model);
                return result == true ? new ResultModel
                {
                    Data = sendData,
                    Message = "Send and save data successful",
                    Status = result
                } : new ResultModel
                {
                    Data = null,
                    Message = "Not send and save data",
                    Status = result
                };
            }
            catch (Exception ex)
            {
                return new ResultModel
                {
                    Status = false,
                    Message = ex.Message,
                    Data = null
                };
            }
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

        public Task ControlDevice(HubDeviceRequestModel model)
        {
            if (model == null)
            {
                return null;
            }
            return null;
        }
    }
}
