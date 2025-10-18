using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class User
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? AvterImage { get; set; }

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual ICollection<FavoritProduct> FavoritProducts { get; set; } = new List<FavoritProduct>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<ReviewAndRating> ReviewAndRatings { get; set; } = new List<ReviewAndRating>();
}
