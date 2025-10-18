using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Interfaces;
using DataAccessLayer.Data;
using DataAccessLayer.Entities;
using DataAccessLayer.Opertions;
using DataAccessLayer.RepoInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repository
{
    //Scaffold-DbContext "Server=.;Database=E_Commerce;Integrated Security=SSPI;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Entities -ContextDir Data -Context ECommerceDbContext -Force
    public class UnitOfWork : IUnitOfWork
    {
        public IReadOnly<City> City { get; private set; }
        public IReadOnly<Brand> Brand { get; private set; }
        public IReadOnly<Category> Category { get; private set; }
        public IGenericRepository<User> User { get; private set; }
        public IGenericRepository<Payment> Payment { get; private set; }
        public IGenericRepository<ReviewAndRating> ReviewAndRating { get; private set; }
        public IGenericRepository<OrdersProduct> OrdersProduct { get; private set; }
        public IGenericRepository<FavoritProduct> FavoritProduct { get; private set; }
        public IGenericRepository<Address> Address { get; private set; }
        public IProductRepository Product { get; private set; }

       public IOrderRepositry Order { get; private set; }


        public IGenericRepository<Image> ImageProduct { get; private set; }



        private readonly ECommerceDbContext _context;

        public UnitOfWork(ECommerceDbContext context)
        {
            _context = context;
            City = new ReadOnlyRepository<City>(_context);
            Brand = new ReadOnlyRepository<Brand>(_context);
            Category = new ReadOnlyRepository<Category>(_context);
            //Product = new GenericRepository<Product>(_context);
            ImageProduct = new GenericRepository<Image>(_context);
            User = new GenericRepository<User>(_context);
            Payment = new GenericRepository<Payment>(_context);
            Address = new GenericRepository<Address>(_context);
            Product = new ProductRpository(_context);
            ReviewAndRating = new GenericRepository<ReviewAndRating>(_context);
            Order = new OrderData(_context);
            OrdersProduct = new GenericRepository<OrdersProduct>(_context);
            FavoritProduct = new GenericRepository<FavoritProduct>(_context);
        } 

        public async Task<bool> Complete()
        {
            int affectedRow = await _context.SaveChangesAsync();

            return affectedRow > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
