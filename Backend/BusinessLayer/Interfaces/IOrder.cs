using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Services;
using DataAccessLayer.Entities;
using DtoLayer.Dtos;
using DtosLayer.Dtos;

namespace BusinessLayer.Interfaces
{
    public interface IOrder
    {
        //Task<List<OrderListDto>> FindOrderProductById(int UserId);
        Task<int?> AddOrder(OrderDto orderDto);
            Task<bool> Delete(int Id);
       Task<List<UserOrdersDto>> FindOrderProductById(int UserId);

        //void Initialize(OrderDto orderDto);

    }
}
