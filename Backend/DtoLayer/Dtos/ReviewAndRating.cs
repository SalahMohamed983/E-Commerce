using System;
using System.Collections.Generic;   
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DtoLayer.Dtos
{
    public class ReviewAndRatingDto
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string ReviewText { get; set; } = null!;
        public byte RatingScore { get; set; }
        public int Id { get; set; } 
        public DateTime DateTime { get; set; }

        public ReviewAndRatingDto() { }
        public ReviewAndRatingDto(int Id,int UserId,int ProductId,string ReviewText,byte RatingScore, DateTime DateTime)
        {
            this.DateTime = DateTime;
            this.Id = Id;
            this.UserId = UserId;
            this.ProductId = ProductId;
            this.ReviewText = ReviewText;
            this.RatingScore = RatingScore;
        }
    }
public class UserAndReviewAndRatingDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string? AvterImage { get; set; }
        public int ProductId { get; set; }
        public string ReviewText { get; set; } = null!;
        public DateTime DateTime { get; set; } 
        public byte RatingScore { get; set; }
        public UserAndReviewAndRatingDto() { }
        public UserAndReviewAndRatingDto(int Id,string FullName,string AvterImage, int ProductId,string ReviewText,DateTime DateTime,byte RatingScore)
        {
            this.Id = Id;
            this.FullName = FullName;
            this.AvterImage = AvterImage;
            this.ProductId = ProductId;
            this.ReviewText = ReviewText;
            this.DateTime = DateTime;
            this.RatingScore = RatingScore;
        }
    }
}
