using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        void Update(T item);
        void Add(T item);
        void Delete(int Id);
        Task<T> GetById(int Id);
        Task<T> GetById(int Id, string[] includes = null);
        Task<T> Get(Expression<Func<T, bool>> expression);
        Task<T> Get(Expression<Func<T, bool>> expression, string[] includes = null);
        Task<List<T>> GetAll();
        Task<List<T>> GetAll(Expression<Func<T, bool>> expression);
        Task<List<T>> GetAll(Expression<Func<T, bool>> expression, string[] includes = null);
        Task<List<T>> GetAll(Expression<Func<T, bool>> expression, int skip, int take, string[] includes = null);
    }
}
