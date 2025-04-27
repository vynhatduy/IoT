using IoT_Farm.Datas;
using IoT_Farm.Models.Request;
using IoT_Farm.Models.Response;

namespace IoT_Farm.Services.Interface
{
    public interface ICameraService
    {
        Task<List<Camera>> GetAllCameraAsync();
        Task<Camera> GetCameraAsync(string cameraId);
        Task<List<Camera>> GetCameraByArea(string area);
        Task<ResultModel> CreateCameraAsync(CameraRequestModel camera);
        Task<ResultModel> UpdateCameraAsync(Camera camera);
        Task<ResultModel> DeleteCameraAsync(string cameraId);
    }
}
