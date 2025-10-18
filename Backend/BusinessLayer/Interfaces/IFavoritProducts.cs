using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Services;
using DtoLayer.Dtos;
using static BusinessLayer.Services.FavoritProductsService;

namespace BusinessLayer.Interfaces
{
    public interface IFavoritProducts
    {
        public int Id { get; set; }
        Task<List<BigFavoritProductsDto>> GetAllFavoritProductByUserId(int UserId);
        Task<bool> Save();
        Task<bool> Delete(int Id);
        void Intialize(FavoritProductsDto proDto);

    }
}
