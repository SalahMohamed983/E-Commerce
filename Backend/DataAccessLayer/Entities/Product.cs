using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Price { get; set; }

    public int Quntity { get; set; }

    public bool IsAvaliable { get; set; }

    public int BrandId { get; set; }

    public short? Discount { get; set; }

    public int Stars { get; set; }

    public virtual Brand Brand { get; set; } = null!;

    public virtual ICollection<FavoritProduct> FavoritProducts { get; set; } = new List<FavoritProduct>();

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();

    public virtual ICollection<OrdersProduct> OrdersProducts { get; set; } = new List<OrdersProduct>();

    public virtual ICollection<ReviewAndRating> ReviewAndRatings { get; set; } = new List<ReviewAndRating>();
}
