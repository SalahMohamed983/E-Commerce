using DataAccessLayer.Data;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using DtosLayer.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public class ProductRpository : GenericRepository<Product>, IProductRepository
    {
        private readonly ECommerceDbContext _context;

        public ProductRpository(ECommerceDbContext context) : base(context)
        {
            _context = context;
        
        }
        public async Task<TotalDataNumDto> TotalNum()
        {
                int TotalOfUsers = await _context.Users.AsNoTracking().CountAsync();
                int TotalOfProducts = await _context.Products.AsNoTracking().CountAsync();
                int TotalOfOrders = await _context.Orders.AsNoTracking().CountAsync();
                int TotalOfCategories= await _context.Categories.AsNoTracking().CountAsync();

            return new TotalDataNumDto { TotalOfUsers = TotalOfUsers, TotalOfProducts = TotalOfProducts, TotalOfOrders = TotalOfOrders, TotalOfCategories = TotalOfCategories };
        }
        public async Task<List<SmallProductDto>> GetAll(Expression<Func<Product, bool>> expression, int skip, int take)
        {

            return (await _context.Set<Product>()
        .Include(p => p.Brand)
            .ThenInclude(b => b.Category)
        .Include(p => p.Images)
        .Where(expression)
        .AsNoTracking()
        .Skip(skip)
        .Take(take)
        .Select(p => new SmallProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Price = p.Price,
            Images = p.Images.Select(i => new ImageDto
            {
                ImageUrl = $"https://saloshop.runasp.net/uploads/products/{i.ImageUrl}"
            }).ToList(),
            Discount = p.Discount,
            Stars = p.Stars,
            Description = p.Description,
            TotalSales = p.OrdersProducts.Sum(p => (int)p.BuyQuantity)
        })
        .ToListAsync());

        }

    }
}
 