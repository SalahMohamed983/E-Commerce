using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class Brand
{
    public int Id { get; set; }

    public string BrandName { get; set; } = null!;

    public int CategoryId { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
