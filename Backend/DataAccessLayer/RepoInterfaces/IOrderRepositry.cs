using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;
using DtosLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.RepoInterfaces
{
    public interface IOrderRepositry: IGenericRepository<Order>
    {
        Task<List<UserOrdersDto>> GetUserOrdersAsync(int userId);
    }
}
