using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using DtoLayer.Dtos;

namespace BusinessLayer.Services
{
    public class FavoritProductsService : IFavoritProducts
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int ProductId { get; set; }
        

        public FavoritProductsDto favoritProductsDto => new FavoritProductsDto(this.UserId, this.ProductId);

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FavoritProductsService(IUnitOfWork UnitOfWork, IMapper mapper)
        {
            _unitOfWork = UnitOfWork;
            _mapper = mapper;
        }

       public void Intialize(FavoritProductsDto proDto)
        {
        this.UserId = proDto.UserId;
        this.ProductId = proDto.ProductId;
        }

        public async Task<List<BigFavoritProductsDto>> GetAllFavoritProductByUserId(int UserId)
        {
         List<FavoritProduct> productList = await _unitOfWork.FavoritProduct.GetAll(p => p.UserId == UserId, new[] { "Product.Images" });

                List<BigFavoritProductsDto> productDtoList = _mapper.Map<List<BigFavoritProductsDto>>(productList);
            
                return productDtoList;

        }

        public async Task<bool> Delete(int Id)
        {
            _unitOfWork.FavoritProduct.Delete(Id); 

            return await _unitOfWork.Complete();
        }

        private async Task<bool> Add()
        {
            var products = _mapper.Map<FavoritProduct>(favoritProductsDto);

           var pro = await _unitOfWork.FavoritProduct.Get(p => p.ProductId == favoritProductsDto.ProductId && p.UserId == favoritProductsDto.UserId);

            if (pro != null)
                return false;

            _unitOfWork.FavoritProduct.Add(products);

            bool res = await _unitOfWork.Complete();

            this.Id = products.Id;

            return res && this.Id != 0;
        }

        public async Task<bool> Save()
        {           if(await Add())
                    {
                        return true;
                    }
                    return false;
            }

         
    }
}
