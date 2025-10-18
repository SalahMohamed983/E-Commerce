using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DtosLayer.Dtos
{
    public class TotalDataNumDto
    {
        public int TotalOfUsers { get; set; }
        public int TotalOfProducts { get; set; }
        public int TotalOfOrders { get; set; }
        public int TotalOfCategories { get; set; }
    }
}
