using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DtosLayer.Dtos
{
    public class OrderDto
    {
        //public int Id { get; set; }

        public int UserId { get; set; }

        public int? PaymentId { get; set; }

        public DateTime OrderDateandTime { get; set; }
        public int AddressId { get; set; }
        public List<OrderProductDto> Products { get; set; }


    }

    public class OrderProductDto
    {
            public int ProductId { get; set; }
        public short BuyQuantity { get; set; }
        public decimal PriceOfPice { get; set; }
        }
    /// <summary>
    /// ////////////////////////////////////////////
    /// </summary>
    


}
