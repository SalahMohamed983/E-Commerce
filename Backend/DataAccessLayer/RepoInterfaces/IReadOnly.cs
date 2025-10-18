using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace DataAccessLayer.RepoInterfaces
{
    public interface IReadOnly<T> where T : class
    {
        Task<List<T>> GetAll();
        Task<List<T>> Get(string[] includes = null);
    }
}
