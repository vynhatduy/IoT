using DotNetEnv;
using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Services.Interface;
using MQTTnet;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
namespace IoT_Farm.Services.MQTT
{
    public class MQTTService : IMQTTService, IHostedService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<MQTTService> _logger;
        private readonly IMqttClient _mqttClient;
        private readonly MqttClientOptions _mqttOptions;

        private bool _isConnecting = false;

        public MQTTService(ILogger<MQTTService> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;

            Env.Load();
            var mqttTopic = Env.GetString("MQTT_TOPIC");
            if (string.IsNullOrEmpty(mqttTopic))
            {
                _logger.LogError("MQTT_TOPIC is empty or null! Using default '#'.");
                mqttTopic = "#";
            }

            var factory = new MqttClientFactory();
            _mqttClient = factory.CreateMqttClient();

            _mqttOptions = new MqttClientOptionsBuilder()
                .WithClientId(Env.GetString("MQTT_CLIENT_ID"))
            .WithTcpServer(Env.GetString("MQTT_BROKER"), Env.GetInt("MQTT_PORT"))
            .WithCredentials(Env.GetString("MQTT_USERNAME"), Env.GetString("MQTT_PasswordHash")).WithTlsOptions(o =>
            {
                o.UseTls();
                o.WithIgnoreCertificateChainErrors();
                o.WithAllowUntrustedCertificates();
            })
            .WithCleanSession()

            .Build();

            _mqttClient.ConnectedAsync += async (MqttClientConnectedEventArgs e) =>
            {
                _logger.LogInformation("Connected to HiveMQ!");
                await _mqttClient.SubscribeAsync(new MqttClientSubscribeOptionsBuilder()
                    .WithTopicFilter(f => f.WithTopic(mqttTopic))
                    .Build());
            };

            _mqttClient.DisconnectedAsync += async (MqttClientDisconnectedEventArgs e) =>
            {
                _logger.LogWarning("Disconnected from HiveMQ! Attempting to reconnect...");
                await ReconnectAsync();
            };

            _mqttClient.ApplicationMessageReceivedAsync += async (MqttApplicationMessageReceivedEventArgs e) =>
            {
                var topic = e.ApplicationMessage.Topic;
                var payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);

                // In ra màn hình console
                //Console.WriteLine($"[MQTT RECEIVED] Topic: {topic} | Payload: {payload}");

                // Ghi log
                //_logger.LogInformation($"Received Message: Topic = {topic}, Payload = {payload}");11

                await HandleReceivedMessage(e);

                await Task.CompletedTask;
            };
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Starting MQTT service...");
            try
            {
                using var timeoutCts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
                using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, timeoutCts.Token);

                await _mqttClient.ConnectAsync(_mqttOptions, linkedCts.Token);
                _logger.LogInformation("MQTT service started successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to start MQTT service: {ex.Message}");
            }
        }

        private async Task ReconnectAsync()
        {
            int retryCount = 0;
            while (!_mqttClient.IsConnected && retryCount < 5)
            {
                try
                {
                    _logger.LogInformation($"Reconnecting to MQTT... Attempt {retryCount + 1}");
                    await Task.Delay(TimeSpan.FromSeconds(5)); // Thời gian chờ trước khi thử lại
                    await _mqttClient.ConnectAsync(_mqttOptions, CancellationToken.None);
                    _logger.LogInformation("Reconnected to HiveMQ!");
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reconnect attempt failed: {ex.Message}");
                    retryCount++;
                }
            }

            if (!_mqttClient.IsConnected)
            {
                _logger.LogError("Failed to reconnect to MQTT after multiple attempts.");
            }
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Stopping MQTT service...");
            await _mqttClient.DisconnectAsync();
        }
        public async Task SubscribeToAllTopics()
        {
            await _mqttClient.SubscribeAsync(new MqttClientSubscribeOptionsBuilder()
                .WithTopicFilter("#") // Lắng nghe tất cả topic
                .Build());

            _logger.LogInformation("Subscribed to ALL topics (#)");
        }

        // 📌 Phương thức đăng ký nhận dữ liệu từ một topic cụ thể
        public async Task SubscribeToTopic(string topic)
        {
            await _mqttClient.SubscribeAsync(new MqttClientSubscribeOptionsBuilder()
                .WithTopicFilter(topic)
                .Build());

            _logger.LogInformation($"Subscribed to Topic: {topic}");
        }
        public async Task HandleReceivedMessage(MqttApplicationMessageReceivedEventArgs e)
        {
            try
            {
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                using var scope = _serviceProvider.CreateScope();
                var environmentService = scope.ServiceProvider.GetRequiredService<IEnvironmentService>();
                var iotDeviceService = scope.ServiceProvider.GetRequiredService<IIoTDeviceService>();

                string topic = e.ApplicationMessage.Topic;
                _logger.LogInformation($"Topic: {topic} ");
                string payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);
                if (topic == "Device/Status")
                {
                    var ioTDevice = JsonSerializer.Deserialize<IoTDeviceRequestModel>(payload, options);
                    if (ioTDevice == null)
                    {
                        _logger.LogWarning("IoT Device Data is null");
                        return;
                    }
                    var isSave = await iotDeviceService.SaveData(ioTDevice);
                    if (isSave)
                    {
                        _logger.LogInformation($"Saved data from {topic} to MongoDB.");
                    }
                    else
                    {
                        _logger.LogInformation($"Data invalid ${topic} | ${JsonSerializer.Serialize(ioTDevice)}");

                    }
                }
                //_logger.LogInformation($"[MQTT RECEIVED] Topic: {topic} | Payload: {payload}");

                // Regex kiểm tra topic có dạng "KhuVuc/KV000-KV009/data"
                if (!Regex.IsMatch(topic, @"^KhuVuc/KV00[0-9]/data$"))
                {
                    _logger.LogWarning($"Ignored topic: {topic}");
                    return;
                }

                var data = JsonSerializer.Deserialize<EnvironmentData>(payload, options);

                if (data != null)
                {
                    bool isSaved = await environmentService.SaveEnvironmentData(data);
                    if (isSaved)
                    {
                        _logger.LogInformation($"Saved data from {topic} to MongoDB.");
                    }
                    else
                    {
                        _logger.LogError($"Failed to save data from {topic} to MongoDB.");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error processing MQTT message: {ex.Message}");
            }
        }
        public async Task<bool> PublishAsync(string topic, string message)
        {
            var payload = new MqttApplicationMessageBuilder()
                .WithTopic(topic)
                .WithPayload(message)
                .WithQualityOfServiceLevel(MQTTnet.Protocol.MqttQualityOfServiceLevel.AtLeastOnce)
                .WithRetainFlag()
                .Build();

            if (!_mqttClient.IsConnected && !_isConnecting)
            {
                _isConnecting = true;
                try
                {
                    await StartAsync(CancellationToken.None);
                }
                finally
                {
                    _isConnecting = false;
                }

                if (!_mqttClient.IsConnected)
                {
                    Console.WriteLine("❌ MQTT Client is still not connected after retry.");
                    return false;
                }
            }

            try
            {
                await _mqttClient.PublishAsync(payload);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Failed to publish message: {ex.Message}");
                return false;
            }
        }

    }
}
