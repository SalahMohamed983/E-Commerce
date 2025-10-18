using BusinessLayer.CoreOfLogicOperations;
using BusinessLayer.Interfaces;
using BusinessLayer.Services;
using DataAccessLayer.Entities;
using DtoLayer.Dtos;
using DtosLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using static BusinessLayer.CoreOfLogicOperations.ProductService;

namespace APILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProduct _products;
        private readonly IWebHostEnvironment _env;
        public ProductsController(IProduct products, IWebHostEnvironment env)
        {
            _env = env;
            this._products = products;
        }

[HttpPost("{productId}/upload-images")]
[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
public async Task<IActionResult> UploadProductImages(int productId, List<IFormFile> files)
{
    if (files == null || files.Count == 0)
        return BadRequest("No files uploaded.");

            var folderPath = Path.Combine(_env.WebRootPath, "uploads", "products");
    
            if (!Directory.Exists(folderPath))
        Directory.CreateDirectory(folderPath);

    var uploadedFiles = new List<string>();

    foreach (var file in files)
    {
        var fileName = $"{productId}_{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(folderPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        await _products.AddImage(productId, fileName); // كل صورة بتتخزن في DB
        uploadedFiles.Add(fileName);
    }

    return Ok(new { Images = uploadedFiles });
}
        [AllowAnonymous]
        [HttpPut("Filter")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<SmallProductDto>>> GetAllProductByFilter(ConditionFilter ConditionSearch)
        {

            //if (page == 0 || productPerPage < 5 || star <= 0 || Brand <= 0 || Category <= 0)
            //    return BadRequest("Parameter Are Wrong");


            var products = await _products.GetAllProductByCategoryAndBrandsSearch(ConditionSearch);

            if (products.Count == 0)
                return NotFound("Products Not Found!");

            return Ok(products);
        }
        [HttpGet("TotalNum")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<TotalDataNumDto>> GetTotalDataNums()
        {

            var Nums = await _products.TotalNums();

            if (Nums == null)
                return NotFound("Nums Not Found!");

            return Ok(Nums);
        }

        [AllowAnonymous]
        [HttpPut("Search")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<SmallProductDto>>> GetAllProductBySearch(ConditionSearch ConditionSearch)
        {
            //Console.WriteLine($"{Request.Scheme} Request Host {Request.Host}");

            //if (page == 0 || productPerPage < 5)
            //    return BadRequest("Parameter Are Wrong");

            var products = await _products.GetAllProductByCategoryAndBrands(ConditionSearch);

            if (products.Count == 0)
                return NotFound("Products Not Found!");

            return Ok(products);
        }
        [AllowAnonymous]
        [HttpGet("MostRatingSales")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<SmallProductDto>>> GetAllProductByRatingAndSales(int Page, int ProPerPage,bool rating, bool sales)
        {
            //Console.WriteLine($"{Request.Scheme} Request Host {Request.Host}");

            //if (page == 0 || productPerPage < 5)
            //    return BadRequest("Parameter Are Wrong");

            var products = await _products.GetAllProductByRatingAndSales(Page, ProPerPage, rating, sales);

            if (products.Count == 0)
                return NotFound("Products Not Found!");

            return Ok(products);
        }

        [AllowAnonymous]
        [HttpGet("{ID}", Name = "GetProduct")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ProductBigDto>> GetProductById(int ID)
        {
            if (ID < 1)
                return BadRequest("Parameter Are Wrong");

            ProductService Product = await _products.FindProductById(ID);

            if (Product == null)
                return NotFound("Products Not Found!");

            ProductBigDto productDto = Product.producBigtDto;

            return Ok(productDto);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateProduct(ProductDto productdto)
        {
            //if (string.IsNullOrEmpty(userdto.UserName) || string.IsNullOrEmpty(userdto.Password))
            //return BadRequest("Parameter Are Wrong");

            try
            {
                ProductService Product = await _products.FindProductById(productdto.Id);

                if (Product == null)
                    return NotFound(" Not Found!");

                Product.Initialize(productdto, ProductService.enMode.enUpdate);

                await Product.Save();
                return Ok("User Update Successfuly!");
                //else
                //return StatusCode(500, "Error!");

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);

            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<int>> AddProduct(ProductDto Productdto)
        {
            //if (string.IsNullOrEmpty(userdto.UserName) || string.IsNullOrEmpty(userdto.Password))
            //return BadRequest("Parameter Are Wrong");

            Productdto.Id = 0;

             _products.Initialize(Productdto, ProductService.enMode.enAdd);

            if (await _products.Save())
            {
                return Ok(_products.Id);

            }
            else
                return StatusCode(500, "Error!");


        }


        [HttpDelete("{ID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult> DeleteProduct(int ID)
        {
            if (ID < 0)
                return BadRequest("Parameter Are Wrong");


            if (await _products.DeleteProduct(ID))
                return Ok("Delete Successfully!");
            else
                return NotFound("Products Not Found!");

        }


}

}

