using IoT_Farm.Datas;

namespace IoT_Farm.Models.Response
{
    public class TokenResponseModel
    {
        public string AccessToken { get; set; }
        public RefreshToken RefreshToken { get; set; }
    }
}
