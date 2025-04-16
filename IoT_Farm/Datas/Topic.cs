using System.ComponentModel;

namespace IoT_Farm.Datas
{
    public enum MqttTopics
    {
        [Description("Device/Unassigned")]
        DeviceUnassigned,         // "Device/Unassigned"
        [Description("Device/{deviceID}/AssignRegion")]
        DeviceAssignRegion,       // "Device/{deviceID}/AssignRegion"
        [Description("Device/Management")]
        DeviceManagement,         // "Device/Management"
        [Description("Device/RequestInfo")]
        DeviceRequestInfo         // "Device/RequestInfo"
    }
}
