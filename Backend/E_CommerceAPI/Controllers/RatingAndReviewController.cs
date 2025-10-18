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
    public class RatingAndReviewController : ControllerBase
    {
        private readonly IReviewAndRating _review;

        public RatingAndReviewController(IReviewAndRating review)
        {
            this._review = review;
        }
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<UserAndReviewAndRatingDto>>> GetReviews(int productId, int section, int reviewsPerSection)
        {
            if (productId < 0 || section < 0 || reviewsPerSection < 5)
                return BadRequest("Parameter Are Wrong");

            try
            {
                var reviews = await _review.FindReviews(productId, section, reviewsPerSection);

                if (reviews.Count == 0)
                    return NotFound("reviews Not Found!");

                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);

            }
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateReview(ReviewAndRatingDto reviewdto)
        {
            //if (string.IsNullOrEmpty(userdto.UserName) || string.IsNullOrEmpty(userdto.Password))
            //    return BadRequest("Parameter Are Wrong");

            try
            {
                ReviewAndRatingService review = await _review.FindReviewById(reviewdto.Id);

                if (review == null)
                    return NotFound("Review Not Found!");

                review.Initialize(reviewdto,ReviewAndRatingService.enMode.enUpdate);
                   
                await review.Save();
                return Ok("Review Update Successfuly!");
                //ealse
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
        public async Task<ActionResult> AddReview(ReviewAndRatingDto reviewdto)
        {
            try
            {
                if (reviewdto == null || reviewdto.UserId <= 0 || reviewdto.ProductId <= 0)
                    return BadRequest("Invalid review data!");

                reviewdto.Id = 0;
                reviewdto.DateTime = DateTime.Now; // ✅ ضيف التاريخ هنا

                _review.Initialize(reviewdto);

                var result = await _review.Save();
                if (result)
                    return Ok("Review added successfully!");
                else
                    return StatusCode(500, "Error while saving review!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
                [HttpDelete("{ID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteReview(int ID)
        {
            if (ID < 0)
                return BadRequest("Parameter Are Wrong");


            if (await _review.Delete(ID))
                return Ok("Delete Successfully!");
            else
                return NotFound("Review Not Found!");

        }


    }
}
