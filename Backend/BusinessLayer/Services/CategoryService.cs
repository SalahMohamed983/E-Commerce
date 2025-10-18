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
    public class CategoryService : ICategory
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoryService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<CategoryDto>> GetAllCategoies()
        {
            List<Category> CategoriesList = await _unitOfWork.Category.GetAll();

            return _mapper.Map<List<CategoryDto>>(CategoriesList);
        }

        public async Task<List<CategoryAndBrandDto>> GetAllCategoiesAndBrands()
        {
            var CategoriesList = await _unitOfWork.Category.Get(new[] { "Brands" });

            return _mapper.Map<List<CategoryAndBrandDto>>(CategoriesList);

        }
    }
}
