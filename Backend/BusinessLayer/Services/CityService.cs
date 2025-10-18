using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using DtosLayer.Dtos;

namespace BusinessLayer.Services
{
    public class CityService : ICity
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CityService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<CityDto>> GetAllCities()
        {
            List<City> CitiesList = await _unitOfWork.City.GetAll();

            return _mapper.Map<List<CityDto>>(CitiesList);
        }
    }
}
