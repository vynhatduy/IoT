﻿using IoT_Farm.Datas;

namespace IoT_Farm.Repositories.Interface
{
    public interface IAreaRepository : IGenericRepository<Area>
    {
        Task<List<Area>> GetAllAsync();
        Task<Area> CreateAsync(Area area);
        Task<bool> DeleteAreaAsync(string id);
        Task<Area> GetByName(string areaId);
    }
}
