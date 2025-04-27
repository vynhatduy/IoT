namespace IoT_Farm.Models.Response
{
    public class ResultModel
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public static ResultModel Success(string message, object data = null) =>
            new ResultModel { Status = true, Message = message, Data = data };

        public static ResultModel Fail(string message) =>
            new ResultModel { Status = false, Message = message, Data = null };
    }
}
