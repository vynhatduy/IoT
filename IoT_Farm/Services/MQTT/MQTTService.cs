using DotNetEnv;
using IoT_Farm.Datas;
using IoT_Farm.Services.Interface;
using MQTTnet;
using System.Text;
using System.Text.Json;
namespace IoT_Farm.Services.MQTT
{
    public class MQTTService : IMQTTService, IHostedService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<MQTTService> _logger;
        private readonly IMqttClient _mqttClient;
        private readonly MqttClientOptions _mqttOptions;
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
                _logger.LogWarning("Disconnected from HiveMQ! Reconnecting in 5 seconds...");
                await Task.Delay(TimeSpan.FromSeconds(5));
                await _mqttClient.ConnectAsync(_mqttOptions, CancellationToken.None);
            };

            _mqttClient.ApplicationMessageReceivedAsync += async (MqttApplicationMessageReceivedEventArgs e) =>
            {
                var topic = e.ApplicationMessage.Topic;
                var payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);

                // In ra màn hình console
                Console.WriteLine($"[MQTT RECEIVED] Topic: {topic} | Payload: {payload}");

                // Ghi log
                _logger.LogInformation($"Received Message: Topic = {topic}, Payload = {payload}");

                await HandleReceivedMessage(e);

                await Task.CompletedTask;
            };
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Starting MQTT service...");
            await _mqttClient.ConnectAsync(_mqttOptions, cancellationToken);
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
                using var scope = _serviceProvider.CreateScope();
                var environmentService = scope.ServiceProvider.GetRequiredService<IEnvironmentService>();

                string topic = e.ApplicationMessage.Topic;
                string payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);

                _logger.LogInformation($"[MQTT RECEIVED] Topic: {topic} | Payload: {payload}");
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

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
    }
}
