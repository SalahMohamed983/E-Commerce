using BusinessLayer.CoreOfLogicOperations;
using DataAccessLayer.Entities;
using DtosLayer.Dtos;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static BusinessLayer.CoreOfLogicOperations.ProductService;
using static System.Net.Mime.MediaTypeNames;

namespace BusinessLayer.Interfaces
{
    public interface IProduct
    {
        public int Id { get; set; }
        Task<List<SmallProductDto>> GetAllProductByRatingAndSales(int Page, int ProPerPage, bool rating, bool sales);
        Task<List<SmallProductDto>> GetAllProductByCategoryAndBrands(
            ConditionSearch ConditionSearch);
        Task<List<SmallProductDto>> GetAllProductByCategoryAndBrandsSearch(ConditionFilter ConditionFilter);

        Task<ProductService> FindProductById(int Id);
        void Initialize(ProductBigDto productDto, enMode mode);
        void Initialize(ProductDto productDto, enMode mode);
        Task<bool> AddImage(int productId, string file);
        Task<bool> DeleteProduct(int Id);
        Task<bool> Save();
        Task<TotalDataNumDto> TotalNums();
    }
}
