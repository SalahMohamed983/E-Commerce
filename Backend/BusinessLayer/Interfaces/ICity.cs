using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DtosLayer.Dtos;

namespace BusinessLayer.Interfaces
{
    public interface ICity
    {
        Task<List<CityDto>> GetAllCities();
    }
}
