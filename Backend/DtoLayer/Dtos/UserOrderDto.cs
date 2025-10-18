using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DtosLayer.Dtos;

public class UserOrdersRaw
{
    public int UserId { get; set; }
    public string FullName { get; set; }
    public string PhoneNum { get; set; }
    public string Street { get; set; }
    public string AddressType { get; set; }
    public int Id { get; set; }
    public string Payment { get; set; }
    public DateTime OrderDateandTime { get; set; }
    public int ProductId { get; set; }
    public string Description { get; set; }
    public short BuyQuantity { get; set; }
    public decimal PriceOfPice { get; set; }
    public string ImageUrl { get; set; }
}

public class ProductOrderDto
{
    public int ProductId { get; set; }
    public string Description { get; set; } = null!;
    public short BuyQuantity { get; set; }
    public decimal PriceOfPice { get; set; }
    public string ImageUrl { get; set; }
}
public class UserOrdersDto
{
    public int UserId { get; set; }
    public string FullName { get; set; }
    public List<UserOrderDto> Orders { get; set; }
}

public class UserOrderDto
{
    public int Id { get; set; }
    public string Payment { get; set; }
    public DateTime OrderDateandTime { get; set; }
    public string PhoneNum { get; set; }
    public string Street { get; set; }
    public string AddressType { get; set; }
    public List<ProductOrderDto> Products { get; set; }
}

