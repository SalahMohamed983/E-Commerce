using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class Address
{
    public int Id { get; set; }

    public string PhoneNum { get; set; } = null!;

    public int CityId { get; set; }

    public string Street { get; set; } = null!;

    public int UserId { get; set; }

    public bool AddressType { get; set; }

    public virtual City City { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User User { get; set; } = null!;
}
