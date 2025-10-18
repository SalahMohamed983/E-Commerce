using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DtosLayer.Dtos;

namespace BusinessLayer.Interfaces
{
    public interface IPayment
    {
        Task<List<PaymentDto>> GetAll(int userId);
        Task<bool> Add(PaymentDto paymentDto);
    }
}
