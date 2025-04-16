namespace IoT_Farm.Models.Response
{
    public class HubDeviceResponseModel
    {
        public string DeviceId { get; set; }
        public string DeviceName { get; set; }
        public bool State { get; set; }
        public string Status { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
