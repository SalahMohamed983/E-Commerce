using AutoMapper;
using BusinessLayer.Interfaces;
using DataAccessLayer.Data;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using DtoLayer.Dtos;
using DtosLayer.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using static BusinessLayer.CoreOfLogicOperations.ProductService;
using System.Linq.Expressions;

namespace BusinessLayer.CoreOfLogicOperations
{
    public class ProductService : IProduct
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quntity { get; set; }
        public int Stars { get; set; }
        public ICollection<ImageDto> Images { get; set; }
        public bool IsAvaliable { get; set; }
        public int BrandId { get; set; }
        public string BrandName { get; set; }
        public int? TotalSales { get; set; }

        public short? Discount { get; set; }
        private readonly IMapper _mapper;
        public ProductDto productDto => new ProductDto(this.Id, this.Name, this.Description, this.Price, this.Quntity, this.IsAvaliable, this.BrandId,
           this.Discount, this.Stars);

        public ProductBigDto producBigtDto => new ProductBigDto(this.Id, this.Name, this.Images, this.Description, this.Price, this.Quntity, this.IsAvaliable, this.BrandName,
           this.Discount, this.Stars, this.TotalSales, this.BrandId);
        public enum enMode { enAdd = 1, enUpdate }
        enMode _mode = enMode.enAdd;

        public enum enCategory {
            Fashion =1, Electronics, Bags,Footwear,Groceries,Beauty,Wellness,Jewellery
        }

        public enum enBrand { Phone = 1,Labtop,Apple,Adidas,Samsung,LG,HP,Dell,Lenovo,Puma }
        public enum enStar { enOne = 1, enTwo, enThree, enFour, enFive }
        public enum enSort { enNameAToZ = 1, enNameZToA, enPriceLow, enPriceHigh }

        public class ConditionFilter
        {
            public enSort? SortProduct { get; set; }
            public int[]? Category { get; set; }
            public enStar Star { get; set; }

            public decimal MaxPrice { get; set; }
            public decimal MinPrice { get; set; }
            public short Page  { get; set; }
            public short ProductPerPage { get; set; }
            public string Search { get; set; }
        }


        public class ConditionSearch
        {
            public enCategory? Category { get; set; }
            public enBrand? Brand { get; set; }
            public short Page { get; set; }
            public short ProductPerPage { get; set; }
            public string Search { get; set; }
        }

        private readonly IUnitOfWork _unitOfWork;

        public ProductService(IMapper mapper, IUnitOfWork UnitOfWork)
        {
            _unitOfWork = UnitOfWork;
            _mapper = mapper;
        }


        public void Initialize(ProductDto productDto, enMode mode)
        {

            Id = productDto.Id;
            Name = productDto.Name;
            Description = productDto.Description;
            Price = productDto.Price;
            Quntity = productDto.Quntity;
            IsAvaliable = productDto.IsAvaliable;
            BrandId = productDto.BrandId;
            Discount = productDto.Discount;
            Stars = productDto.Stars;

        }
        public void Initialize(ProductBigDto productDto, enMode mode)
        {

            Id = productDto.Id;
            Name = productDto.Name;
            Description = productDto.Description;
            Price = productDto.Price;
            Quntity = productDto.Quntity;
            IsAvaliable = productDto.IsAvaliable;
            BrandName = productDto.BrandName;
            Discount = productDto.Discount;
            Stars = productDto.Stars;
            Images = productDto.Images;
            BrandId = productDto.BrandId;
            TotalSales = productDto.TotalSales;
            _mode = enMode.enUpdate;
        }
        public async Task<List<SmallProductDto>> GetAllProductByCategoryAndBrands(ConditionSearch ConditionSearch)
        {
            string search = ConditionSearch.Search;
            short ProPerPage = ConditionSearch.ProductPerPage;

            var productList = !string.IsNullOrEmpty(ConditionSearch.Search) ? await _unitOfWork.Product.GetAll(p => (p.Name.Contains(search) ||
            p.Description.Contains(search)), (ConditionSearch.Page - 1) * ProPerPage, ProPerPage) : (ConditionSearch.Brand != null || ConditionSearch.Brand == 0 )?
                   await _unitOfWork.Product.GetAll(p => p.Brand.Id == (int)ConditionSearch.Brand, (ConditionSearch.Page - 1) * ProPerPage, ProPerPage)
               : await _unitOfWork.Product.GetAll(p => p.Brand.Category.Id == (int)ConditionSearch.Category, (ConditionSearch.Page - 1) * ProPerPage, ProPerPage);

            return productList;
        }
        public async Task<List<SmallProductDto>> GetAllProductByCategoryAndBrandsSearch(ConditionFilter filter)
        {
            short proPerPage = filter.ProductPerPage;
            string search = filter.Search ?? "";
            List<SmallProductDto> list;

            var productList = await _unitOfWork.Product.GetAll(
                p =>
                    // البحث بالكلمة
                    (string.IsNullOrEmpty(search) || p.Name.Contains(search) || p.Description.Contains(search)) &&

                    // الفلترة بالسعر
                    (filter.MinPrice == 0 || p.Price >= filter.MinPrice) &&
                    (filter.MaxPrice == 0 || p.Price <= filter.MaxPrice) &&

                    // الفلترة بالنجوم
                    (filter.Star == 0 || p.Stars >= (int)filter.Star) &&

                    // الفلترة بالكاتيجوري
                    (filter.Category == null ||  filter.Category.Length == 0 || filter.Category.Contains(p.Brand.Category.Id)),

                // pagination
                (filter.Page - 1) * proPerPage,
                proPerPage,

                // includes
                new[] { "Brand.Category", "Images", "OrdersProducts" }
            );

            list = _mapper.Map<List<SmallProductDto>>(productList); 

            switch (filter.SortProduct)
            {
                case enSort.enPriceLow:
                    list = list.OrderBy(p => p.Price).ToList(); 
                    break;
                case enSort.enPriceHigh:
                    list = list.OrderByDescending(p => p.Price ).ToList(); 
                    break;
                case enSort.enNameAToZ:
                    list = list.OrderBy(p => p.Name).ToList();
                    break;
                case enSort.enNameZToA:
                    list = list.OrderByDescending(p => p.Name).ToList();
                    
                    break;
            }
            return list; 
        }

        public async Task<TotalDataNumDto> TotalNums()
        {
            return await _unitOfWork.Product.TotalNum();
        }
        public async Task<List<SmallProductDto>> GetAllProductByRatingAndSales(int Page,int ProPerPage, bool rating, bool sales)
        {
            List<Product> productList;
            List<SmallProductDto> list;
            if (rating)
            {
             productList = await _unitOfWork.Product.GetAll(p => p.Stars >= 4 && p.Stars <= 5, (Page - 1) * ProPerPage, ProPerPage, new[] { "Brand.Category", "Images", "OrdersProducts" });
            list = _mapper.Map<List<SmallProductDto>>(productList);
            }
            else
            {
             productList = await _unitOfWork.Product.GetAll(p => true,(Page - 1) * ProPerPage, ProPerPage, new[] { "Brand.Category", "Images", "OrdersProducts" });
                list = _mapper.Map<List<SmallProductDto>>(productList).OrderByDescending(p => p.TotalSales).ToList();
            }


            return list;
        }
        public async Task<ProductService> FindProductById(int Id)
        {
            Product Pro = await _unitOfWork.Product.GetById(Id,new[] { "Images", "OrdersProducts", "Brand" });

            ProductBigDto ProDto = _mapper.Map<ProductBigDto>(Pro);

            if (Pro != null)
            {
                Initialize(ProDto, enMode.enUpdate);
                return this;
            }

            return null;
        }

        public async Task<bool> AddImage(int productId, string file)
        {

            _unitOfWork.ImageProduct.Add(new Image { ImageUrl = file, ProductId = productId});
            return await _unitOfWork.Complete();
        }

        public async Task<bool> DeleteProduct(int Id)
        {
            _unitOfWork.Product.Delete(Id);

            return (await _unitOfWork.Complete());
        }
        private async Task<bool> UpdateProduct()
        {
            Product Product = _mapper.Map<Product>(productDto);
            _unitOfWork.Product.Update(Product);

            return (await _unitOfWork.Complete());

        }
        private async Task<bool> AddProduct()
        {
            Product Product = _mapper.Map<Product>(productDto);

            _unitOfWork.Product.Add(Product);


            bool res = await _unitOfWork.Complete();

            this.Id = Product.Id;

            return res && this.Id != 0;
        }
        public async Task<bool> Save()
        {
            switch (_mode)
            {
                case enMode.enAdd:
                    if (await AddProduct())
                    _mode = enMode.enUpdate;
                        return true;

                    
                    
    
                    return false;
                case enMode.enUpdate:
                    return await UpdateProduct();
            }

            return false;
        }

        
    }
}
