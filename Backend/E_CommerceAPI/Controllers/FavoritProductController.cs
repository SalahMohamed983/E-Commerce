using BusinessLayer.Interfaces;
using BusinessLayer.Services;
using DataAccessLayer.Entities;
using DtoLayer.Dtos;
using DtosLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static BusinessLayer.CoreOfLogicOperations.ProductService;

namespace APILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FavoritProductController : ControllerBase
    {
        private readonly IFavoritProducts _favoritProducts;

        public FavoritProductController(IFavoritProducts pro)
        {
            this._favoritProducts = pro;
        }

        [HttpGet("{UserId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<BigFavoritProductsDto>>> GetAllFavoritProductsByUserId(int UserId)
        {

            var products = await _favoritProducts.GetAllFavoritProductByUserId(UserId);

            if (products.Count == 0)
                return NotFound("Products Not Found!");

            return Ok(products);
        }



        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> AddFavoritProduct(FavoritProductsDto proDto)
        {
            //if (string.IsNullOrEmpty(userdto.UserName) || string.IsNullOrEmpty(userdto.Password))
            //return BadRequest("Parameter Are Wrong");

            
            _favoritProducts.Intialize(proDto);


            if (await _favoritProducts.Save())
            {
                return Ok($"FavoritProducts Id {_favoritProducts.Id} Add Successfuly!");

            }
            else
                return Ok($"FavoritProducts Id {_favoritProducts.Id} Is Found!");
             

        }


        [HttpDelete("{ID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeletefavoritProducts(int ID)
        {
            if (ID < 0)
                return BadRequest("Parameter Are Wrong");


            if (await _favoritProducts.Delete(ID))
                return Ok("favoritProducts Successfully!");
            else
                return NotFound("favoritProducts Not Found!");

        }
    }
}
