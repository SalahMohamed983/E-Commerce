using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.CoreOfLogicOperations;
using BusinessLayer.Services;
using DtosLayer.Dtos;
using static BusinessLayer.Services.UserService;

namespace BusinessLayer.Interfaces
{
    public interface IUser
    {
        Task<UserService> FindUserByPasswordAndEmail(string password,string username);
        Task<UserService> FindUserById(int Id);
        Task<bool> Save();
        Task<bool> Delete(int Id);
        void Initialize(UserDto userDto, enMode mode = enMode.enAdd);
        void Initialize(UserAddDto userDto, enMode mode = enMode.enAdd);
        Task<List<UserDto>> GetAllUsers();

    }
}
