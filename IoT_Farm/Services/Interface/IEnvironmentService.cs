using IoT_Farm.Datas;

namespace IoT_Farm.Services.Interface
{
    public interface IEnvironmentService
    {
        Task<bool> SaveEnvironmentData(EnvironmentData data);
        Task<bool> UpdateEnvironmentData(string id, EnvironmentData data);
        Task<bool> DeleteEnvironmentData(string id);
        Task<List<EnvironmentData>> GetAllEnvironmentData();
        Task<List<EnvironmentData>> GetEnvironmentDataByArea(string areaId);
        Task<List<EnvironmentData>> GetEnvironmentDataByArea(DateTime from, DateTime to, string area);
        Task<EnvironmentData?> GetLatestEnvironmentData();
        Task<List<EnvironmentData>> GetEnvironmentDataByDate(DateTime date, string area);
        Task<(double Humidity, double AirQuality, double Temperature, double Brightness)> GetAverageEnvironmentData(DateTime date);
    }
}
