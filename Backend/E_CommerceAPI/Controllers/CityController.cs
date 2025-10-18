using BusinessLayer.Interfaces;
using DtosLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICity _city;

        public CityController(ICity city)
        {
            _city = city;
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<CityDto>>> GetAllCities()
        {
            var citiesList = await _city.GetAllCities();

            if (citiesList.Count == 0)
                return NotFound("Not Found Brands!");

            return Ok(citiesList);
        }
    }
}
