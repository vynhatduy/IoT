namespace IoT_Farm.Datas
{
    public class DeviceTimeConfig
    {
        public TimeRangeString? Time { get; set; }
        public ScheduleConfigInt? Schedule { get; set; }
    }

    public class TimeRangeString
    {
        public string Start { get; set; } = string.Empty;
        public string End { get; set; } = string.Empty;
    }

    public class ScheduleConfigInt
    {
        public int? IntervalMinutes { get; set; }
    }
}
