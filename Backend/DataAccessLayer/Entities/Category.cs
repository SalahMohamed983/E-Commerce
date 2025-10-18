using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class Category
{
    public int Id { get; set; }

    public string CategoryName { get; set; } = null!;

    public virtual ICollection<Brand> Brands { get; set; } = new List<Brand>();
}
