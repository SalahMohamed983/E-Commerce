using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Data;
using DataAccessLayer.RepoInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repository
{
    public class ReadOnlyRepository<T> : IReadOnly<T> where T : class
    {
        private readonly ECommerceDbContext _context;

        public ReadOnlyRepository(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task<List<T>> Get(string[] includes = null)
        {
            IQueryable<T> query = _context.Set<T>();

            if (includes != null)
                foreach (var include in includes)
                    query = query.Include(include);

            return await query.ToListAsync();
        }

        public async Task<List<T>> GetAll()
        {
            return await _context.Set<T>().AsNoTracking().ToListAsync();
        }
    }
}
