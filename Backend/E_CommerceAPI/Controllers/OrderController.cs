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
    public class OrderController : ControllerBase
    {
        private readonly IOrder _order;

        public OrderController(IOrder order)
        {
            this._order = order;
        }

        [HttpGet("{userID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<UserOrdersDto>>> GetOrderProductByUserId(int userID)
        {
            if (userID < 0)
                return BadRequest("Parameter Are Wrong");

            var order = await _order.FindOrderProductById(userID);

            if (order.Count == 0)
                return NotFound("Order Not Found!");

            return Ok(order);

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddOrder(OrderDto orderDto)
        {
            //return BadRequest("Parameter Are Wrong");

            orderDto.OrderDateandTime = DateTime.Now;
            try
            {
            int? orderId = await _order.AddOrder(orderDto);


            if (orderId.HasValue)
                return Ok($"Order {orderId} Add Successfuly!");

                return Ok($"Order Not Added");
          
            } catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpDelete("{orderId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteOrder(int orderId)
        {
            //return BadRequest("Parameter Are Wrong");

            //there insted of delete trigger for update isDeleted to true (soft delete)
            if (await _order.Delete(orderId))
                return Ok("Order Add Successfuly!");
            else
                return NotFound("Order Not Found!");

        }
    }
}
