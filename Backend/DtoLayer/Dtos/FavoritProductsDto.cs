using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DtosLayer.Dtos;

namespace DtoLayer.Dtos
{
    public class FavoritProductsDto
    {
        
        public int UserId { get; set; }

        public int ProductId { get; set; }
    
    public FavoritProductsDto( int UserId, int ProductId)
        {
            this.UserId = UserId;
            this.ProductId = ProductId;
        }
        public FavoritProductsDto() { }
    }

    public class BigFavoritProductsDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public int Quntity { get; set; }

        public int ProductId { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public ICollection<ImageDto> Images { get; set; }

        public short? Discount { get; set; }
        public int Stars { get; set; }
        public string Description { get; set; } = null!;

    }
}
