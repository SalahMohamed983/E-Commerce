using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;

namespace DataAccessLayer.RepoInterfaces
{
    public interface IUnitOfWork : IDisposable
    {
      IReadOnly<City> City { get; }
        IReadOnly<Brand> Brand { get; }
        IReadOnly<Category> Category { get; }
        IGenericRepository<User> User { get; }
        IGenericRepository<Address> Address { get; }
        IGenericRepository<Payment> Payment { get; }
        IGenericRepository<ReviewAndRating> ReviewAndRating { get; }
        IOrderRepositry Order { get; }
        IGenericRepository<Image> ImageProduct { get; }

        IGenericRepository<OrdersProduct> OrdersProduct { get; }
        IGenericRepository<FavoritProduct> FavoritProduct { get; }
        IProductRepository Product { get; }
        Task<bool> Complete();
    }
}
