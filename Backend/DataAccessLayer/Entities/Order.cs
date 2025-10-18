using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class Order
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int? PaymentId { get; set; }

    public DateTime OrderDateandTime { get; set; }

    public int AddressId { get; set; }

    public virtual Address Address { get; set; } = null!;

    public virtual ICollection<OrdersProduct> OrdersProducts { get; set; } = new List<OrdersProduct>();

    public virtual Payment? Payment { get; set; }

    public virtual User User { get; set; } = null!;
}
