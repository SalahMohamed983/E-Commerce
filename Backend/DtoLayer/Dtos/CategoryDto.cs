using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DtosLayer.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string? CategoryName { get; set; }
    }
    public class CategoryAndBrandDto
    {
        public int Id { get; set; }
        public string? CategoryName { get; set; }
        public ICollection<BrandDto> Brands { get; set; }
    }

    }
