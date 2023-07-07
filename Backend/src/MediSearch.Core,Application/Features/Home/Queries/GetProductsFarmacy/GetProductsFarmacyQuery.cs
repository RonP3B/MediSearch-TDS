using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Interfaces.Repositories;

namespace MediSearch.Core.Application.Features.Home.Queries.GetProductsFarmacy
{
    public class GetProductsFarmacyQuery : IRequest<List<GetProductsFarmacyQueryResponse>>
    {

    }

    public class GetProductsFarmacyQueryHandler : IRequestHandler<GetProductsFarmacyQuery, List<GetProductsFarmacyQueryResponse>>
    {
        private readonly IProductRepository _productRepository;
        private readonly ICompanyTypeRepository _typeRepository;
        private readonly IMapper _mapper;

        public GetProductsFarmacyQueryHandler(IProductRepository productRepository, ICompanyTypeRepository typeRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _typeRepository = typeRepository;
            _mapper = mapper;
        }

        public async Task<List<GetProductsFarmacyQueryResponse>> Handle(GetProductsFarmacyQuery request, CancellationToken cancellationToken)
        {
            var result = await GetAllProducts();

            return result;
        }

        public async Task<List<GetProductsFarmacyQueryResponse>> GetAllProducts()
        {
            var products = await _productRepository.GetAllWithIncludeAsync(new List<string>() { "Company" });
            var farmacy = await _typeRepository.GetByNameAsync("Farmacia");
            
            List<GetProductsFarmacyQueryResponse> response = products.Where(p => p.Company.CompanyTypeId == farmacy.Id).Select(p => new GetProductsFarmacyQueryResponse()
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Images = p.UrlImages,
                NameCompany = p.Company.Name,
                Available = p.Quantity > 0
            }).ToList();

            return response;
        }

    }
}
