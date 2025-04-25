namespace IoT_Farm.Models.Response
{
    public class EnvironmentResponseModel
    {
        public DateTime TimeStamp { get; set; }
        public string Area { get; set; }
        public string Type { get; set; }
        public double Value { get; set; }
    }
}
