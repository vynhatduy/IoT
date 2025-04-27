using MQTTnet;

namespace IoT_Farm.Services.MQTT
{
    public interface IMQTTService
    {
        Task StartAsync(CancellationToken cancellationToken);
        Task StopAsync(CancellationToken cancellationToken);
        Task HandleReceivedMessage(MqttApplicationMessageReceivedEventArgs e);
        Task<bool> PublishAsync(string topic, string message);
    }
}
