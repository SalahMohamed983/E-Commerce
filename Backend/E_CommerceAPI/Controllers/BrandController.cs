using BusinessLayer.Interfaces;
using DtosLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace APILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrand _brand;

        public BrandController(IBrand brand)
        {
            _brand = brand;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<BrandDto>>> GetAllBrands()
        {
            var brandsList = await _brand.GetAllBrands();

            if (brandsList.Count == 0)
                return NotFound("Not Found Brands!");

            return Ok(brandsList);
        }
    }
}
