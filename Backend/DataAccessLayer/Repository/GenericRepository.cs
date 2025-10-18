using BusinessLayer.Interfaces;
using DataAccessLayer.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly ECommerceDbContext _context;

        public GenericRepository(ECommerceDbContext context)
        {
            this._context = context;
        }
        public void Update(T item)
        {
            _context.Set<T>().Update(item);
        }

        public void Add(T item)
        {
            _context.Set<T>().Add(item);
        }

        public void Delete(int Id)
        {
            var item = _context.Set<T>().Find(Id);
            if (item != null)
                _context.Set<T>().Remove(item);
        }
        public async Task<List<T>> GetAll()
        {
            return await _context.Set<T>().AsNoTracking().ToListAsync();
        }

        public async Task<T> GetById(int Id)
        {
            return await _context.Set<T>()
                           .AsNoTracking()
                           .FirstOrDefaultAsync(e => EF.Property<int>(e, "Id") == Id);
        }
       
        public async Task<T> Get(Expression<Func<T, bool>> expression)
        {
            return await _context.Set<T>().AsNoTracking().SingleOrDefaultAsync(expression);
        }
        public async Task<T> Get(Expression<Func<T, bool>> expression, string[] includes = null)
        {
            IQueryable<T> query = _context.Set<T>();

            if (includes != null)
                foreach(var include in includes)
                query = query.Include(include);

            return await query.AsNoTracking().SingleOrDefaultAsync(expression);
        }
        public async Task<List<T>> GetAll(Expression<Func<T, bool>> expression)
        {
            return await _context.Set<T>().AsNoTracking().Where(expression).ToListAsync();
        }

        public async Task<List<T>> GetAll(Expression<Func<T, bool>> expression, int skip, int take, string[] includes = null)
        {
            IQueryable<T> query = _context.Set<T>();

            if (includes != null)
            {
                foreach (var include in includes)
                    query = query.Include(include);
            }

            return await query.Where(expression).AsNoTracking().Skip(skip).Take(take).ToListAsync();
        }

        public async Task<List<T>> GetAll(Expression<Func<T, bool>> expression, string[] includes = null)
        {
            IQueryable<T> query = _context.Set<T>();

            if (includes != null)
            {
                foreach (var include in includes)
                    query = query.Include(include);
            }

            Console.WriteLine(query.ToQueryString());
            return await query.Where(expression).AsNoTracking().ToListAsync();
        }

        public async Task<T> GetById(int Id, string[] includes = null)
        {
            IQueryable<T> query = _context.Set<T>();

            if (includes != null)
                foreach (var include in includes)
                    query = query.Include(include);

            return await query.AsNoTracking()
                           .FirstOrDefaultAsync(e => EF.Property<int>(e, "Id") == Id); ;
        }
    }
}
