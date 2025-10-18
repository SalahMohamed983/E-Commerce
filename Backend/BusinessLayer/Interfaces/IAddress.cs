using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Services;
using DtoLayer.Dtos;
using DtosLayer.Dtos;
using static BusinessLayer.Services.AddressService;

namespace BusinessLayer.Interfaces
{
    public interface IAddress
    {
        Task<List<AddressAndCityDto>> FindAddressListById(int Id);
        Task<bool> FindAddressById(int Id);
        Task<bool> Save();
        Task<bool> Delete(int Id);
        void Initialize(AddressDto AddressDto, enMode mode = enMode.enAdd);

    }
}
