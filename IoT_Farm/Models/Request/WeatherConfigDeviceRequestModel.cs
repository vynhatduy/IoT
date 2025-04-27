using IoT_Farm.Datas;

namespace IoT_Farm.Models.Request
{
    public class WeatherConfigDeviceRequestModel
    {
        public string Area { get; set; }
        public string Device { get; set; }
        public string Name { get; set; }
        public Conditions Conditions { get; set; }
    }

}
