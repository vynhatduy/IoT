namespace IoT_Farm.Models.Request
{
    public class CameraRequestModel
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public string Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string TypeConnect { get; set; }
        public string Area { get; set; }
    }
}
