using IoT_Farm.Datas;
using IoT_Farm.Datas.Adapter;
using IoT_Farm.Models.Response;
using IoT_Farm.Repositories.Interface;

namespace IoT_Farm.Repositories.Implement
{
    public class CameraRepository : GenericRepository<Camera>, ICameraRepository
    {
        public CameraRepository(DatabaseAdapterFactory adapterFactory) : base(adapterFactory)
        {
        }

        public async Task<ResultModel> CreateCameraAsync(Camera camera)
        {
            try
            {
                var result = await _databaseAdapter.AddAsync(camera);
                return new ResultModel
                {
                    Data = camera,
                    Message = result ? "Tạo thành công" : "Không thể tạo mới",
                    Status = result
                };
            }
            catch (Exception ex)
            {
                return new ResultModel
                {
                    Status = false,
                    Message = ex.Message,
                    Data = null
                };
            }
        }

        public async Task<ResultModel> DeleteCameraAsync(string cameraId)
        {
            try
            {
                var result = await _databaseAdapter.DeleteAsync(cameraId);
                return new ResultModel
                {
                    Data = cameraId,
                    Message = result ? "Tạo thành công" : "Không thể tạo mới",
                    Status = result
                };
            }
            catch (Exception ex)
            {
                return new ResultModel
                {
                    Status = false,
                    Message = ex.Message,
                    Data = null
                };
            }
        }

        public async Task<List<Camera>> GetAllCameraAsync()
        {
            try
            {
                return await _databaseAdapter.GetAsync(_ => true);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<Camera> GetCameraAsync(string cameraId)
        {
            try
            {
                return await _databaseAdapter.FindOneAsync(x => x.Id == cameraId);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<Camera>> GetCameraByArea(string area)
        {
            try
            {
                return await _databaseAdapter.FindAsync(x => x.Area == area);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<ResultModel> UpdateCameraAsync(string id, Camera camera)
        {
            try
            {
                var item = await _databaseAdapter.FindOneAsync(id);
                if (item == null)
                {
                    return new ResultModel
                    {
                        Data = camera,
                        Message = "Không tìm thấy camera",
                        Status = false
                    };
                }
                item.UpdateAt = DateTime.Now;
                item.Username = camera.Username;
                item.Password = camera.Password;
                item.Name = camera.Name;
                item.Port = camera.Port;
                item.Url = camera.Url;
                item.TypeConnect = camera.TypeConnect;
                var result = await _databaseAdapter.UpdateAsync(id, item);
                return new ResultModel
                {
                    Data = item,
                    Message = result ? "Cập nhật thành công" : "Không thể cập nhật camera",
                    Status = result
                };

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ResultModel
                {
                    Status = false,
                    Message = ex.Message,
                    Data = null
                };
            };
        }
    }
}
