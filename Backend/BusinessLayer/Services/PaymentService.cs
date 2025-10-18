using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using DtosLayer.Dtos;
using static BusinessLayer.Services.UserService;

namespace BusinessLayer.Services
{
    public class PaymentService : IPayment
    {

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public PaymentService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        public async Task<bool> Add(PaymentDto paymentDto)
        {
            Payment payment = _mapper.Map<Payment>(paymentDto);

            _unitOfWork.Payment.Add(payment);

            return (await _unitOfWork.Complete());
        }


        public async Task<List<PaymentDto>> GetAll(int userId)
        {
            List<PaymentDto> result = _mapper.Map<List<PaymentDto>>(await _unitOfWork.Payment.GetAll(x => x.UserId == userId && x.IsDeleted != true));
           
            return result;
        }
    }
}
