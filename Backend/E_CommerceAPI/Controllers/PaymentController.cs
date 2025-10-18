using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;
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
    public class PaymentController : ControllerBase
    {
        private readonly IPayment _payment;

        public PaymentController(IPayment payment)
        {
            this._payment = payment;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<PaymentDto>>> GetAllPaymentByUserId(int userID)
        {
        //        return BadRequest("Parameter Are Wrong");

            var payments = await _payment.GetAll(userID);

            if (payments.Count == 0)
                return NotFound("payments Not Found!");

            return Ok(payments);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddPayment(PaymentDto Payment)
        {
            //return BadRequest("Parameter Are Wrong");

            Payment.Id = 0;
            if (await _payment.Add(Payment))
                return Ok("Payment Add Successfuly!");
            else
                return NotFound("Payment Not Found!");

        }
    }
}
