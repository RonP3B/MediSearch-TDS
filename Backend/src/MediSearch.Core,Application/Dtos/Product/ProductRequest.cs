using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Dtos.Product
{
    public record ProductRequest(
        string Name,
        string Description,
        List<string> Categories,
        List<string> Components,
        double Price,
        int Quantity,
        List<string> UrlImages
    ){
        [JsonIgnore]
        public string Id { get; set; }
        [JsonIgnore]
        public string CompanyId { get; set; }

    }
}
