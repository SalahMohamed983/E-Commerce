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
using DtosLayer.Dtos;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Services
{
    public class OrderService : IOrder
    {
        //public int Id { get; set; }
        //public int UserId { get; set; }
        //public int PaymentId { get; set; }
        //public decimal TotalAmount { get; set; }
        //public DateTime OrderDateandTime { get; set; }
        //public short Status { get; set; }
        //public int ShippingId { get; set; }
        //public decimal DeliveryPrice { get; set; }
        //public string DeliveryDescription { get; set; }
        //public string DeliveryName { get; set; }


        //public OrderDto orderDto => new OrderDto(this.Id, this.UserId, this.PaymentId, this.TotalAmount, this.OrderDateandTime, this.Status, this.ShippingId);
        //public DeliveryAndOrderDto DeliveryOrderDto => new DeliveryAndOrderDto(this.TotalAmount, this.OrderDateandTime, this.Status, this.DeliveryPrice, this.DeliveryDescription, this.DeliveryName);



        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public OrderService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        //public void Initialize(OrderDto orderDto)
        //{

        //    this.Id = orderDto.Id;
        //    this.UserId = orderDto.UserId;
        //    this.PaymentId = orderDto.PaymentId;
        //    this.TotalAmount = orderDto.TotalAmount;
        //    this.OrderDateandTime = orderDto.OrderDateandTime;
        //    this.Status = orderDto.Status;
        //    this.ShippingId = orderDto.ShippingId;

        //}

        public async Task<bool> Delete(int Id)
        {
            _unitOfWork.Order.Delete(Id);

            return (await _unitOfWork.Complete());
        }
        public async Task<int?> AddOrder(OrderDto orderDto)
        {
            try
            {
                var order = _mapper.Map<Order>(orderDto);

                _unitOfWork.Order.Add(order);

                if (await _unitOfWork.Complete())
                    return order.Id;

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error while saving order: " + ex.Message);

                if (ex.InnerException != null)
                {
                    Console.WriteLine("InnerException: " + ex.InnerException.Message);
                }

                throw; 
            }
        }
        public async Task<List<UserOrdersDto>> FindOrderProductById(int UserId)
        {
            return await _unitOfWork.Order.GetUserOrdersAsync(UserId);
        }
    }
}
