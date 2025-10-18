using BusinessLayer.Interfaces;
using BusinessLayer.Services;
using DataAccessLayer.Entities;
using DtoLayer.Dtos;
using DtosLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AddressController : ControllerBase
    {
        private readonly IAddress _Address;

        public AddressController(IAddress Address)
        {
            this._Address = Address;
        }

        [HttpGet("{Id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<AddressAndCityDto>>> GetAddress(int Id)
        {
                        
            try
            {
                var addressList = await _Address.FindAddressListById(Id);

                if (addressList.Count == 0)
                    return NotFound("Products Not Found!");

                return Ok(addressList);

            }
        catch(Exception ex)
            {
                return StatusCode(500, ex.Message);

    }
}
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateAddress(AddressDto Addressdto)
        {
            try
            {
                var exists = await _Address.FindAddressById(Addressdto.Id);

                if (!exists)
                    return NotFound("Address Not Found!");

                // لازم هنا نحدد انه Update
                _Address.Initialize(Addressdto, AddressService.enMode.enUpdate);

                if (await _Address.Save())
                    return Ok("Address Updated Successfully!");

                return StatusCode(500, "Error while updating!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<ActionResult> AddAddress(AddressDto Addressdto)
            {
            //if (string.IsNullOrEmpty(userdto.UserName) || string.IsNullOrEmpty(userdto.Password))
            //return BadRequest("Parameter Are Wrong");

            Addressdto.Id = 0;

            _Address.Initialize(Addressdto, AddressService.enMode.enAdd);

                if (await _Address.Save())
                {
                    return Ok($"Address Add Successfuly!");

                }
                else
                    return StatusCode(500, "Error!");

            }


            [HttpDelete("{ID}")]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<ActionResult> DeleteAddress(int ID)
            {
                if (ID < 0)
                    return BadRequest("Parameter Are Wrong");


                if (await _Address.Delete(ID))
                    return Ok("Delete Successfully!");
                else
                    return NotFound("Products Not Found!");

            }
        }
}
