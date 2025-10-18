using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class Payment
{
    public int Id { get; set; }

    public string NameOnCard { get; set; } = null!;

    public DateTime DateOfExpiretion { get; set; }

    public short ThirdNum { get; set; }

    public string NumOfCrad { get; set; } = null!;

    public bool? IsDeleted { get; set; }

    public int? UserId { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User? User { get; set; }
}
