using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using DtoLayer.Dtos;
using DtosLayer.Dtos;

namespace BusinessLayer.Services
{
    public class AddressService : IAddress
        {
        public int Id { get; set; }

        public string PhoneNum { get; set; } = null!;

        public int CityId { get; set; }
        public string CityName { get; set; }

        public string Street { get; set; } = null!;

        public int UserId { get; set; }

        public bool AddressType { get; set; }

        public AddressAndCityDto AddressAndCityDto => new AddressAndCityDto(this.Id,this.PhoneNum, this.CityName,this.CityId, this.Street, this.UserId, this.AddressType);
            public AddressDto AddressDto => new AddressDto(this.Id, this.PhoneNum,this.CityId, this.Street, this.UserId, this.AddressType);

            public enum enMode { enAdd = 1, enUpdate }

            enMode _mode = enMode.enAdd;

            private readonly IMapper _mapper;
            private readonly IUnitOfWork _unitOfWork;

            public AddressService(IMapper mapper, IUnitOfWork unitOfWork)
            {
                _mapper = mapper;
                _unitOfWork = unitOfWork;
            }

            public void Initialize(AddressDto AddressDto, enMode mode = enMode.enAdd)
             {

                this.Id = AddressDto.Id;
                this.PhoneNum = AddressDto.PhoneNum;
                this.CityId = AddressDto.CityId;
                this.Street = AddressDto.Street;
            this.UserId = AddressDto.UserId;
            this.AddressType = AddressDto.AddressType;

            _mode = mode;
            }
   
            public async Task<bool> Delete(int Id)
            {
                _unitOfWork.Address.Delete(Id);

                    return (await _unitOfWork.Complete());
        }
            private async Task<bool> AddUser()
            {
                Address Address = _mapper.Map<Address>(AddressDto);

                _unitOfWork.Address.Add(Address);

                return await _unitOfWork.Complete();
            }

            private async Task<bool> UpdateUser()
            {
                Address Address = _mapper.Map<Address>(AddressDto);
                _unitOfWork.Address.Update(Address);

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

            public async Task<bool> FindAddressById(int Id)
            {

                Address Address = await _unitOfWork.Address.Get(x => x.Id == Id);


                if (Address != null)
                {
             
                return true;
            }

                return false;
            }

        public async Task<List<AddressAndCityDto>> FindAddressListById(int Id)
        {

        List<Address> Address = await _unitOfWork.Address.GetAll(x => x.UserId == Id, new[] { "City", "User" });


            return _mapper.Map<List<AddressAndCityDto>>(Address);
        }



    }
}
