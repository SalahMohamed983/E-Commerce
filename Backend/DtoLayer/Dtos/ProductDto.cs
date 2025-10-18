using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;

namespace DtosLayer.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
     public string Name { get; set; } = null!;
     public string Description { get; set; } = null!;
    public decimal Price { get; set; }
       public int Quntity { get; set; }
        public int Stars { get; set; }

        public bool IsAvaliable { get; set; }
        public int BrandId { get; set; }
        public short? Discount { get; set; }
        public ProductDto() { }
        public ProductDto(int ProductId, string Name, string Description, decimal Price,int Quntity, bool IsAvaliable, int BrandId,
            short? Discount, int Stars)
        {
            this.Description = Description;
            this.Quntity = Quntity;
            this.IsAvaliable = IsAvaliable;
            this.Discount = Discount;
            this.BrandId = BrandId;
            this.Id = ProductId;
            this.Name = Name;
            this.Price = Price;
            this.Stars = Stars;
        }

    }
    /// <summary>
    /// ////////////////////////////////////////////

    public class ProductBigDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quntity { get; set; }
        public int Stars { get; set; }
        public int BrandId { get; set; }
        public bool IsAvaliable { get; set; }
        public string BrandName { get; set; }
        public short? Discount { get; set; }
        public int? TotalSales { get; set; }
        public ICollection<ImageDto> Images { get; set; }

        public ProductBigDto() { }
        public ProductBigDto(int ProductId, string Name, ICollection<ImageDto>? Images, string Description, decimal Price, int Quntity, bool IsAvaliable, string BrandName,
            short? Discount, int Stars, int? totalSales, int BrandId)
        {
            this.BrandId = BrandId;
            this.Description = Description;
            this.Quntity = Quntity;
            this.IsAvaliable = IsAvaliable;
            this.Discount = Discount;
            this.BrandName =  BrandName;
            this.Id = ProductId;
            this.Name = Name;
            this.Price = Price;
            this.Stars = Stars;
            this.TotalSales = totalSales;
            this.Images = Images;

        }

    }


    /// </summary>

    public class SmallProductDto
    {

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public ICollection<ImageDto> Images { get; set; }
        public short? Discount { get; set; }
        public int Stars { get; set; }
        public string Description { get; set; } = null!;
        public int? TotalSales { get; set; }

        public SmallProductDto(int ProductId, string Name, decimal Price, ICollection<ImageDto>? Images, short? Discount, int Stars, string Description, int? totalSales)
        {
            this.Id = ProductId;
            this.Name = Name;
            this.Price = Price;
            this.Images = Images;
            this.Discount = Discount;
            this.Stars = Stars;
            this.Description = Description;
            this.TotalSales = totalSales;
        }

        public SmallProductDto()
        {
        }
    }
}
