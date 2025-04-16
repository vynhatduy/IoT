using IoT_Farm.Datas;

namespace IoT_Farm.Models.Request
{
    public class AreaDeviceRequestModel
    {

        public string AreaId { get; set; }
        public string Topic { get; set; }
        public List<DeviceDetailRequestModel> DeviceDetails { get; set; }
    }

    public class DeviceDetailRequestModel
    {
        public string Name { get; set; }
        public DeviceType Type { get; set; }
        public List<Dictionary<string, bool>> Details { get; set; }
    }

}
