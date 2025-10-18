using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Services;
using DtoLayer.Dtos;
using static BusinessLayer.Services.ReviewAndRatingService;

namespace BusinessLayer.Interfaces
{
    public interface IReviewAndRating
    {
        Task<List<UserAndReviewAndRatingDto>> FindReviews(int userId, int section, int reviewsPerSection);
        Task<ReviewAndRatingService> FindReviewById(int Id);
        Task<bool> Save();
        Task<bool> Delete(int Id);
        void Initialize(ReviewAndRatingDto review, enMode mode = enMode.enAdd);
        
    }
}
