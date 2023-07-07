namespace MediSearch.Core.Application.Features.Home.Queries.GetProductsLaboratory
{
    public class GetProductsLaboratoryQueryResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Double Price { get; set; }
        public List<string>? Images { get; set; }
        public string NameCompany { get; set; }
        public bool Available { get; set; }
    }
}
