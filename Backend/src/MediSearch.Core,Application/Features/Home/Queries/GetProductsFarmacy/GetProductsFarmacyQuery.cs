using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Interfaces.Repositories;
using MediSearch.Core.Domain.Entities;

namespace MediSearch.Core.Application.Features.Home.Queries.GetProductsFarmacy
{
    public class GetProductsFarmacyQuery : IRequest<List<ProductHomeDTO>>
    {

    }

    public class GetProductsFarmacyQueryHandler : IRequestHandler<GetProductsFarmacyQuery, List<ProductHomeDTO>>
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

        public async Task<List<ProductHomeDTO>> Handle(GetProductsFarmacyQuery request, CancellationToken cancellationToken)
        {
            var result = await GetAllProducts();

            return result;
        }

        public async Task<List<ProductHomeDTO>> GetAllProducts()
        {
            var products = await _productRepository.GetAllWithIncludeAsync(new List<string>() { "Company" });
            var farmacy = await _typeRepository.GetByNameAsync("Farmacia");
            
            List<ProductHomeDTO> response = products.Where(p => p.Company.CompanyTypeId == farmacy.Id).Select(p => new ProductHomeDTO()
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                UrlImages = p.UrlImages,
                Categories = p.Categories,
                Components = p.Components,
                Quantity = p.Quantity,
                Price = p.Price,
                Available = p.Quantity > 0,
                NameCompany = p.Company.Name,
                Province = p.Company.Province,
                Municipality = p.Company.Municipality,
                Address = p.Company.Address
            }).ToList();

            return response;
        }

    }
}
