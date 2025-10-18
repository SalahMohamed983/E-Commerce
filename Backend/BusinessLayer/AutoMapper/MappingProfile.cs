using AutoMapper;
using Azure.Core;
using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;
using DtoLayer.Dtos;
using DtosLayer.Dtos;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace DataAccessLayer.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Brand, BrandDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<City, CityDto>();

            CreateMap<Category, CategoryAndBrandDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(Src => Src.Id))
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(Src => Src.CategoryName))
                .ForMember(dest => dest.Brands, opt => opt.MapFrom(Src => Src.Brands));



            CreateMap<Product, ProductDto>()
    .ConstructUsing(p => new ProductDto(
        p.Id,
        p.Name,
        p.Description,
        p.Price,
        p.Quntity,
        p.IsAvaliable,
        p.BrandId,
        p.Discount,
        p.Stars
        )).ReverseMap();

            CreateMap<Product, SmallProductDto>()
       .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
       .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
       .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
       .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images.Select(p => new ImageDto { ImageUrl = "https://saloshop.runasp.net/uploads/products/" + p.ImageUrl })))
       .ForMember(dest => dest.Discount, opt => opt.MapFrom(src => src.Discount))
       .ForMember(dest => dest.Stars, opt => opt.MapFrom(src => src.Stars))
       .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
       .ForMember(dest => dest.TotalSales, opt => opt.MapFrom(src => src.OrdersProducts.Sum(opt => opt.BuyQuantity)));


            CreateMap<Product, ProductBigDto>()
       .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
       .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
       .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
       .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images.Select(p => new ImageDto {ImageUrl = "https://saloshop.runasp.net/uploads/products/" + p.ImageUrl })))
       .ForMember(dest => dest.Discount, opt => opt.MapFrom(src => src.Discount))
       .ForMember(dest => dest.Stars, opt => opt.MapFrom(src => src.Stars))
       .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
       .ForMember(dest => dest.Quntity, opt => opt.MapFrom(src => src.Quntity))
       .ForMember(dest => dest.IsAvaliable, opt => opt.MapFrom(src => src.IsAvaliable))
       .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Brand.BrandName))
       .ForMember(dest => dest.BrandId, opt => opt.MapFrom(src => src.Brand.Id))
       .ForMember(dest => dest.TotalSales, opt => opt.MapFrom(src => src.OrdersProducts.Sum(opt => opt.BuyQuantity)));
       
       


            //CreateMap<Image, ImageDto>().ReverseMap(); 

            CreateMap<User, UserDto>().ConstructUsing(p => new UserDto(p.Id, p.FullName, p.Password, p.Email, p.AvterImage)).ReverseMap();
            CreateMap<User, UserAddDto>().ConstructUsing(p => new UserAddDto(p.FullName, p.Password, p.Email)).ReverseMap();
            

                    CreateMap<PaymentDto, Payment>().ReverseMap();

                
            CreateMap<Address, AddressAndCityDto>()
                .ConstructUsing(p => new AddressAndCityDto(
                    p.Id,
                    p.PhoneNum,
                    p.City.CityName,
                    p.City.Id,
                    p.Street,
                    p.UserId,
                    p.AddressType
                )).ReverseMap();
  
            CreateMap<Address, AddressDto>().ConstructUsing(p => new AddressDto(
                    p.Id,
                    p.PhoneNum,
                    p.CityId,
                    p.Street,
                     p.UserId,
                    p.AddressType
                )).ReverseMap();

            CreateMap<ReviewAndRating, ReviewAndRatingDto>().ReverseMap();
            CreateMap<ReviewAndRating, ReviewAndRatingDto>()
                 .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
       .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId))
       .ForMember(dest => dest.ReviewText, opt => opt.MapFrom(src => src.ReviewText))
       .ForMember(dest => dest.DateTime, opt => opt.MapFrom(src => src.DateTime))
       .ForMember(dest => dest.RatingScore, opt => opt.MapFrom(src => src.RatingScore))
       .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId));


            CreateMap<ReviewAndRating, UserAndReviewAndRatingDto>()
       .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
       .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User.FullName))
       .ForMember(dest => dest.AvterImage, opt => opt.MapFrom(src => src.User.AvterImage))
       .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId))
       .ForMember(dest => dest.ReviewText, opt => opt.MapFrom(src => src.ReviewText))
       .ForMember(dest => dest.DateTime, opt => opt.MapFrom(src => src.DateTime))
       .ForMember(dest => dest.RatingScore, opt => opt.MapFrom(src => src.RatingScore));



            CreateMap<OrderDto, Order>()
      .ForMember(dest => dest.OrdersProducts, opt => opt.MapFrom(src => src.Products))
      //.ForMember(dest => dest.OrderDateandTime, opt => opt.MapFrom(_ => DateTime.UtcNow))
      .ForMember(dest => dest.PaymentId, opt => opt.MapFrom(src => src.PaymentId))
      .ForMember(dest => dest.AddressId, opt => opt.MapFrom(src => src.AddressId))
      .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
       .ForMember(dest => dest.OrderDateandTime, opt => opt.MapFrom(src => src.OrderDateandTime));

            CreateMap<OrderProductDto, OrdersProduct>()
    .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId))
    .ForMember(dest => dest.BuyQuantity, opt => opt.MapFrom(src => src.BuyQuantity))
    .ForMember(dest => dest.PriceOfPice, opt => opt.MapFrom(src => src.PriceOfPice))
    .ReverseMap();


            CreateMap<FavoritProduct, BigFavoritProductsDto>()
      .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
       .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
      .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId))
      .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
      .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Product.Price))
      .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Product.Images.Select(p => new ImageDto { ImageUrl = "https://saloshop.runasp.net/uploads/products/" + p.ImageUrl })))
       .ForMember(dest => dest.Discount, opt => opt.MapFrom(src => src.Product.Discount))
       .ForMember(dest => dest.Stars, opt => opt.MapFrom(src => src.Product.Stars))
       .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Product.Description))
       .ForMember(dest => dest.Quntity, opt => opt.MapFrom(src => src.Product.Quntity));

            CreateMap<FavoritProduct, FavoritProductsDto>().ConstructUsing(p => new FavoritProductsDto( p.UserId, p.ProductId)).ReverseMap();




          
        }

    }
}
