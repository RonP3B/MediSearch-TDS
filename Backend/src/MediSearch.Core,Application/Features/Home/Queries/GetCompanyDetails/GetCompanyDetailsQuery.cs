using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Dtos.Company;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Home.Queries.GetCompanyDetails
{
    public class GetCompanyDetailsQuery : IRequest<CompanyDetailsDTO>
    {
        public string Id { get; set; }
    }

    public class GetCompanyDetailsQueryHandler : IRequestHandler<GetCompanyDetailsQuery, CompanyDetailsDTO>
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public GetCompanyDetailsQueryHandler(ICompanyRepository companyRepository, IProductRepository productRepository, IMapper mapper)
        {
            _companyRepository = companyRepository;
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<CompanyDetailsDTO> Handle(GetCompanyDetailsQuery request, CancellationToken cancellationToken)
        {
            var company = await _companyRepository.GetByIdAsync(request.Id);
            var result = _mapper.Map<CompanyDetailsDTO>(company);
            if(company != null)
            {
                var products = await _productRepository.GetProductsByCompany(request.Id);
                result.Products = products.Select(p => new ProductHomeDTO()
                {
                    Id = p.Id,
                    Name = p.Name,
                    NameCompany = company.Name,
                    Images = p.UrlImages,
                    Price = p.Price,
                    Available = p.Quantity > 0
                }).ToList();
            }

            return result;
        }

    }
}
