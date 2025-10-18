using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using DtoLayer.Dtos;

namespace BusinessLayer.Services
{
 public class ReviewAndRatingService : IReviewAndRating
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string? AvterImage { get; set; }
        public int ProductId { get; set; }
        public string ReviewText { get; set; } = null!;
        public DateTime DateTime { get; set; }
        public byte RatingScore { get; set; }
        public enum enMode { enAdd = 1, enUpdate }

        enMode _mode = enMode.enAdd;


        public ReviewAndRatingDto reviewAndRatingDto => new ReviewAndRatingDto(this.Id, this.UserId, 
            this.ProductId, this.ReviewText, this.RatingScore, this.DateTime);

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ReviewAndRatingService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public void Initialize(ReviewAndRatingDto review, enMode mode = enMode.enAdd)
        {
            this.Id = review.Id;
            this.UserId = review.UserId;
            this.ProductId = review.ProductId;
            this.ReviewText = review.ReviewText;
            this.RatingScore = review.RatingScore;
            this.DateTime = review.DateTime;
            _mode = mode;
           
        }




        public async Task<List<UserAndReviewAndRatingDto>> FindReviews(int productId, int section, int reviewsPerSection)
        {
            List<ReviewAndRating> reviewList = await _unitOfWork.ReviewAndRating.GetAll(p => p.ProductId == productId, (section - 1) * reviewsPerSection, reviewsPerSection, new[] { "User" });
            return _mapper.Map<List<UserAndReviewAndRatingDto>>(reviewList);
        }

        private async Task<bool> AddReview()
        {
            ReviewAndRating Review = _mapper.Map<ReviewAndRating>(reviewAndRatingDto);

            _unitOfWork.ReviewAndRating.Add(Review);

            return await _unitOfWork.Complete();
        }

        private async Task<bool> UpdateReview()
        {
            ReviewAndRating Review = _mapper.Map<ReviewAndRating>(reviewAndRatingDto);

            _unitOfWork.ReviewAndRating.Update(Review);

            return (await _unitOfWork.Complete());
        }

        public async Task<bool> Save()
        {
            switch (_mode)
            {
                case enMode.enAdd:
                    if (await AddReview())
                        return true;

                    return false;
                case enMode.enUpdate:
                    return await UpdateReview();
            }

            return false;
        }

        public async Task<bool> Delete(int Id)
        {
                 _unitOfWork.ReviewAndRating.Delete(Id);
            return await _unitOfWork.Complete(); 
        }

        public async Task<ReviewAndRatingService> FindReviewById(int Id)
        {
           ReviewAndRating review = await _unitOfWork.ReviewAndRating.GetById(Id);


            if (review != null)
            {
                    ReviewAndRatingDto reviewDto = _mapper.Map<ReviewAndRatingDto>(review);
                    Initialize(reviewDto, enMode.enUpdate);
                

                return this;
            }

            return null;
        }
    }
}
