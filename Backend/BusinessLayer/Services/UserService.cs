using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using DtosLayer.Dtos;
using static System.Net.Mime.MediaTypeNames;

namespace BusinessLayer.Services
{
    public class UserService : IUser
    {
        public int Id { get; set; }

        public string FullName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Email { get; set; } = null;

        public string? AvterImage { get; set; }

        public UserDto userDto => new UserDto(this.Id, this.FullName, this.Password, this.Email, this.AvterImage);
        public UserAddDto userAddDto => new UserAddDto(this.FullName, this.Password, this.Email);

        public enum enMode { enAdd = 1, enUpdate }

        enMode _mode = enMode.enAdd;

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        public void Initialize(UserAddDto userDto, enMode mode = enMode.enAdd)
        {
            FullName = userDto.FullName;
            Password = userDto.Password;
            Email = userDto.Email;

            _mode = mode;
        }

        public void Initialize(UserDto userDto, enMode mode = enMode.enAdd)
        {
            Id = userDto.Id;
            FullName = userDto.FullName;
            Password = userDto.Password;
            Email = userDto.Email;
            AvterImage = userDto.AvterImage;

            _mode = mode;
        }
        public async Task<bool> Delete(int Id)
        {
            _unitOfWork.User.Delete(Id);

            if (await _unitOfWork.Complete())
                return true;
            else
                return false;
        }
        private async Task<bool> AddUser()
        {
            User foundUser = await _unitOfWork.User.Get(x => x.Email == userDto.Email);


            if (foundUser != null)
                return false;

            User user = _mapper.Map<User>(userAddDto);

            _unitOfWork.User.Add(user);

            return await _unitOfWork.Complete();
        }

        private async Task<bool> UpdateUser()
        {
            User user = _mapper.Map<User>(userDto);
            _unitOfWork.User.Update(user);

            return (await _unitOfWork.Complete());
        }

        public async Task<bool> Save()
        {
            switch (_mode)
            {
                case enMode.enAdd:
                    if (await AddUser())
                        return true;

                    return false;
                case enMode.enUpdate:
                    return await UpdateUser();
            }

            return false;
        }

        public async Task<UserService> FindUserByPasswordAndEmail(string password, string Email)
        {

            User user = await _unitOfWork.User.Get(x => x.Password == password && x.Email == Email);


            if (user != null)
            {
                UserDto userDto = _mapper.Map<UserDto>(user);

                Initialize(userDto, enMode.enUpdate);

                return this;
            }

            return null;
        }

        public async Task<List<UserDto>> GetAllUsers()
        {
            List<User> UserList = await _unitOfWork.User.GetAll();
            
            return _mapper.Map<List<UserDto>>(UserList);
        }


        public async Task<UserService> FindUserById(int Id)
        {

            User user = await _unitOfWork.User.GetById(Id);


            if (user != null)
            {
                UserDto userDto = _mapper.Map<UserDto>(user);

                Initialize(userDto, enMode.enUpdate);

                return this;
            }

            return null;
        }

    }

}
