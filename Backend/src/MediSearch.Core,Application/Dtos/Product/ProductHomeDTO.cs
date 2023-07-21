using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Dtos.Product
{
    public class ProductHomeDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Double Price { get; set; }
        public List<string>? Images { get; set; }
        public string NameCompany { get; set; }
        public bool Available { get; set; }
    }
}
