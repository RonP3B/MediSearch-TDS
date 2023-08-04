using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Dtos.Company;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Features.Home.Queries.GetCompanyByName;
using MediSearch.Core.Application.Interfaces.Repositories;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Home.Queries.GetCompanyByName
{
    public class GetCompanyByNameQuery : IRequest<List<GetCompanyByNameQueryResponse>>
    {
        [SwaggerParameter(Description = "Nombre")]
        [Required(ErrorMessage = "Debe de ingresar datos para hacer la búsqueda.")]
        public string Name { get; set; }
    }

    public class GetCompanyByNameQueryHandler : IRequestHandler<GetCompanyByNameQuery, List<GetCompanyByNameQueryResponse>>
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public GetCompanyByNameQueryHandler(ICompanyRepository companyRepository, IProductRepository productRepository, IMapper mapper)
        {
            _companyRepository = companyRepository;
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<List<GetCompanyByNameQueryResponse>> Handle(GetCompanyByNameQuery request, CancellationToken cancellationToken)
        {
            var companies = await _companyRepository.GetAllWithIncludeAsync(new List<string>() { "CompanyType"});
            List<GetCompanyByNameQueryResponse> result = companies.Where(c => c.Name.ToLower().Contains(request.Name.ToLower())).Select(c => new GetCompanyByNameQueryResponse()
            {
                Id = c.Id,
                Name = c.Name,
                UrlImage = c.UrlImage,
                Type = c.CompanyType.Name 
            }).ToList();

            return result;
        }
    }
}
