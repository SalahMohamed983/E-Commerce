using BusinessLayer.Interfaces;
using DtosLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _category;

        public CategoryController(ICategory category)
        {
            _category = category;
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<CategoryDto>>> GetAllCategories()
        {
            var categoriesList = await _category.GetAllCategoies();

            if (categoriesList.Count == 0)
                return NotFound("Not Found Brands!");

            return Ok(categoriesList);
        }
        [HttpGet("Brnd")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<CategoryAndBrandDto>>> GetAllCategoriesAndBrand()
        {
            var categoriesList = await _category.GetAllCategoiesAndBrands();

            if (categoriesList.Count == 0)
                return NotFound("Not Found Brands!");

            return Ok(categoriesList);
        }
    }
}
