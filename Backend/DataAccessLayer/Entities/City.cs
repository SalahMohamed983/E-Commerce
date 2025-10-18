using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class City
{
    public int Id { get; set; }

    public string CityName { get; set; } = null!;

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();
}
