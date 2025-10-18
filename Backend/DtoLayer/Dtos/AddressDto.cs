using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DtoLayer.Dtos
{
    public class AddressAndCityDto
    {
        public int Id { get; set; }

        public string PhoneNum { get; set; } = null!;
        public string CityName { get; set; }
        public int CityId { get; set; }

        public string Street { get; set; } = null!;

        public int UserId { get; set; }

        public bool AddressType { get; set; }

        public AddressAndCityDto(int Id, string PhoneNum, string CityName, int CityId, string Street, int UserId, bool AddressType)
        {
            this.Id = Id;
            this.PhoneNum = PhoneNum;
            this.CityId = CityId;
            this.CityName = CityName;
            this.Street = Street;
            this.UserId = UserId;
            this.AddressType = AddressType;
        }
        public AddressAndCityDto() { }
    }
    public class AddressDto
    {
        public int Id { get; set; }

        public string PhoneNum { get; set; } = null!;

        public int CityId { get; set; }

        public string Street { get; set; } = null!;

        public int UserId { get; set; }

        public bool AddressType { get; set; }


        public AddressDto(int Id, string PhoneNum, int CityId, string Street, int UserId, bool AddressType)
        {
            this.Id = Id;
            this.PhoneNum = PhoneNum;
            this.CityId = CityId;
            this.Street = Street;
            this.UserId = UserId;
            this.AddressType = AddressType;
        }
        public AddressDto() { }
    }
}
