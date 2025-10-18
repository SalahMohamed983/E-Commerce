using DtosLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;
using PayPalHttp;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PayPalController : ControllerBase
    {
        private readonly PayPalEnvironment _environment;
        private readonly PayPalHttpClient _client;

        public PayPalController()
        {
            // Sandbox credentials (بدّلهم ببيانات حسابك من PayPal Developer)
            _environment = new SandboxEnvironment(
                "ATtglIiaUpILT01r95oMxGr0sbxBLb0xwe1gpMy_-E-oUqslEvBZgVF-zDn0zW09zNozqDNIFeeZvGRP",
                "ENGgpv20BS1t55ux3xKPG6cQvHI0ZKdQD9ue2rw6yLBBFpAp5fbvcLy8jXwIwgzgC3R-LHbIagB--a3J"
            );
            _client = new PayPalHttpClient(_environment);
        }

        // ============================
        // Create Order
        // ============================
        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] PaypalDto body)
        {
            var amount = body.Amount ?? "10.00";

            var request = new OrdersCreateRequest();
            request.Prefer("return=representation");
            request.RequestBody(new OrderRequest
            {
                CheckoutPaymentIntent = "CAPTURE",
                PurchaseUnits = new List<PurchaseUnitRequest>
                {
                    new PurchaseUnitRequest
                    {
                        AmountWithBreakdown = new AmountWithBreakdown
                        {
                            CurrencyCode = "USD",
                            Value = amount
                        }
                    }
                },
                ApplicationContext = new ApplicationContext
                {
                    ReturnUrl = "http://localhost:5173/success",  // صفحة نجاح الدفع
                    CancelUrl = "http://localhost:5173/cancel"    // صفحة الإلغاء
                }
            });

            var response = await _client.Execute(request);
            var result = response.Result<Order>();

            // ✅ رجّع response منظم (بدل {} فاضي)
            return Ok(new
            {
                id = result.Id,
                status = result.Status,
                links = result.Links.Select(l => new { l.Href, l.Rel, l.Method })
            });
        }

        // ============================
        // Capture Order
        // ============================
        [HttpPost("capture-order/{orderId}")]
        public async Task<IActionResult> CaptureOrder(string orderId)
        {
            var request = new OrdersCaptureRequest(orderId);
            request.RequestBody(new OrderActionRequest());

            var response = await _client.Execute(request);
            var result = response.Result<Order>();

            return Ok(new
            {
                id = result.Id,
                status = result.Status,
                payer = result.Payer,
                purchase_units = result.PurchaseUnits
            });
        }
    }
}
