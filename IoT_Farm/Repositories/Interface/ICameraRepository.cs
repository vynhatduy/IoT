using IoT_Farm.Datas;
using IoT_Farm.Models.Response;

namespace IoT_Farm.Repositories.Interface
{
    public interface ICameraRepository : IGenericRepository<Camera>
    {
        Task<List<Camera>> GetAllCameraAsync();
        Task<Camera> GetCameraAsync(string cameraId);
        Task<List<Camera>> GetCameraByArea(string area);
        Task<ResultModel> CreateCameraAsync(Camera camera);
        Task<ResultModel> UpdateCameraAsync(string id, Camera camera);
        Task<ResultModel> DeleteCameraAsync(string cameraId);
    }
}
