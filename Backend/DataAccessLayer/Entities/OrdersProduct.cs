using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class OrdersProduct
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public int ProductId { get; set; }

    public short BuyQuantity { get; set; }

    public decimal PriceOfPice { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
