using IoT_Farm.Datas;

namespace IoT_Farm.Services.Interface
{
    public interface IEnvironmentService
    {
        Task SaveEnvironmentData(EnvironmentData data);
        Task<bool> UpdateEnvironmentData(string id, EnvironmentData data);
        Task<bool> DeleteEnvironmentData(string id);
        Task<List<EnvironmentData>> GetAllEnvironmentData();
        Task<List<EnvironmentData>> GetEnvironmentDataByArea(string areaId);
        Task<EnvironmentData?> GetLatestEnvironmentData();

    }
}
