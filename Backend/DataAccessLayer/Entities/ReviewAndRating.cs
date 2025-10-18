using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class ReviewAndRating
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int ProductId { get; set; }

    public string ReviewText { get; set; } = null!;

    public DateTime DateTime { get; set; }

    public byte RatingScore { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
