using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Interfaces;
using DtosLayer.Dtos;
using DataAccessLayer.RepoInterfaces;
using DataAccessLayer.Entities;

namespace BusinessLayer.Services
{
    public class BrandService : IBrand
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BrandService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<BrandDto>> GetAllBrands()
        {
            List<Brand> brandsList = await _unitOfWork.Brand.GetAll();

            return _mapper.Map<List<BrandDto>>(brandsList);
        }
    }
}
