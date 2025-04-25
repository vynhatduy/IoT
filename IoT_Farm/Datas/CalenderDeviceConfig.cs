using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IoT_Farm.Datas
{
    public class CalenderDeviceConfig
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        public string Name { get; set; }
        public DateRange Date { get; set; }
        public string Area { get; set; }
        public string Device { get; set; }
        public DeviceSchedule Light { get; set; }
        public DeviceSchedule Fan { get; set; }
        public DeviceSchedule Pump { get; set; }
        public DeviceSchedule Heater { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public bool Status { get; set; } = true;
    }
    public class DateRange
    {
        private DateTime _start;
        private DateTime _end;

        public DateTime Start
        {
            get => _start.Date;
            set => _start = DateTime.SpecifyKind(value.Date, DateTimeKind.Utc);
        }

        public DateTime End
        {
            get => _end.Date;
            set => _end = DateTime.SpecifyKind(value.Date, DateTimeKind.Utc);
        }
    }


    public class TimeRange
    {
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
    }


    public class DeviceSchedule
    {
        public TimeRange Time { get; set; }
        public ScheduleConfig? Schedule { get; set; }
    }



    public class ScheduleConfig
    {
        public string Mode { get; set; }
        public int Hours { get; set; }
    }
}
