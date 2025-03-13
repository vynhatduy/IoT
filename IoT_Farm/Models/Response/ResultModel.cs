namespace IoT_Farm.Models.Response
{
    public class ResultModel
    {
        public bool Status { get; set; }
        public object? Data { get; set; }
        public string? Message { get; set; }
    }
}
