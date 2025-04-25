using IoT_Farm.Datas;

namespace IoT_Farm.Models.Request
{
    public class CalenderDeviceConfigRequestModel
    {
        public string Name { get; set; }
        public DateRange Date { get; set; }
        public string Area { get; set; }
        public string Device { get; set; }
        public DeviceSchedule Light { get; set; }
        public DeviceSchedule Fan { get; set; }
        public DeviceSchedule Pump { get; set; }
        public DeviceSchedule Heater { get; set; }
    }
}
