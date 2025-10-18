using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Interfaces;
using DataAccessLayer.Data;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using DataAccessLayer.Repository;
using DtosLayer.Dtos;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Opertions
{
    public class OrderData : GenericRepository<Order>, IOrderRepositry
    {
        private readonly ECommerceDbContext _context;

        public OrderData(ECommerceDbContext context) : base(context)
        {
            _context = context;

        }


        public async Task<List<UserOrdersDto>> GetUserOrdersAsync(int userId)
        {
            var flatData = await _context.UserOrders
                .FromSqlInterpolated($"SELECT * FROM dbo.GetUserOrders({userId})")
                .AsNoTracking()
                .ToListAsync();

            var userOrders = flatData
                .GroupBy(x => x.UserId)
                .Select(u => new UserOrdersDto
                {
                    UserId = u.Key,
                    FullName = u.First().FullName,

                    Orders = u.GroupBy(o => o.Id)
                        .Select(g => new UserOrderDto
                        {
                            Id = g.Key,
                            Payment = g.First().Payment,
                            OrderDateandTime = g.First().OrderDateandTime,
                            PhoneNum = g.First().PhoneNum,
                            Street = g.First().Street,
                            AddressType = g.First().AddressType,

                            Products = g
                                .GroupBy(p => p.ProductId)
                                .Select(pg => new ProductOrderDto
                                {
                                    ProductId = pg.Key,
                                    Description = pg.First().Description,
                                    BuyQuantity = (short)pg.Sum(x => x.BuyQuantity),
                                    PriceOfPice = pg.First().PriceOfPice,
                                    ImageUrl = $"https://saloshop.runasp.net/uploads/products/{pg.First().ImageUrl}"
                                })
                                .ToList()
                        })
                        .ToList()
                })
                .ToList();

            return userOrders;
        }


    }
}
