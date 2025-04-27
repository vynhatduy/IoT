namespace IoT_Farm.Models.Request
{
    public class HubDeviceRequestModel
    {
        public string Uid { get; set; }
        public string DeviceId { get; set; }
        public string DeviceName { get; set; }
        public bool State { get; set; }
    }
}
