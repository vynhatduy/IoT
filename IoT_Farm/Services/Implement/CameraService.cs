using IoT_Farm.Datas;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Interface;
using IoT_Farm.Services.Interface;
using MongoDB.Bson;

namespace IoT_Farm.Services.Implement
{
    public class CameraService : ICameraService
    {
        private readonly ICameraRepository _repo;

        public CameraService(ICameraRepository repo)
        {
            _repo = repo;
        }

        public async Task<ResultModel> CreateCameraAsync(Camera camera)
        {
            try
            {
                camera.Id = ObjectId.GenerateNewId().ToString();

                return await _repo.CreateCameraAsync(camera);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<ResultModel> DeleteCameraAsync(string cameraId)
        {
            try
            {

                return await _repo.DeleteCameraAsync(cameraId);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<Camera>> GetAllCameraAsync()
        {
            return await _repo.GetAllCameraAsync();
        }

        public async Task<Camera> GetCameraAsync(string cameraId)
        {
            return await _repo.GetCameraAsync(cameraId);
        }

        public async Task<List<Camera>> GetCameraByArea(string area)
        {
            return await _repo.GetCameraByArea(area);
        }

        public async Task<ResultModel> UpdateCameraAsync(Camera camera)
        {
            try
            {
                return await _repo.UpdateCameraAsync(camera.Id, camera);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
