using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DtosLayer.Dtos
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public string NameOnCard { get; set; }
        public string NumOfCrad { get; set; } = null!;

        public DateTime DateOfExpiretion { get; set; }

        public short ThirdNum { get; set; }
        public bool? IsDeleted { get; set; }

        public int? UserId { get; set; }
    }
}
