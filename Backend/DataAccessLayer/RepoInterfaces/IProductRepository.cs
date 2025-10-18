using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;
using DtosLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.RepoInterfaces
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<List<SmallProductDto>> GetAll(Expression<Func<Product, bool>> expression, int skip, int take);
        Task<TotalDataNumDto> TotalNum();
    }
}
