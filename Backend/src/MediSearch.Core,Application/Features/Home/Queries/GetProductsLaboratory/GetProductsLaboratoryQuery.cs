﻿using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Interfaces.Repositories;

namespace MediSearch.Core.Application.Features.Home.Queries.GetProductsLaboratory
{
    public class GetProductsLaboratoryQuery : IRequest<List<GetProductsLaboratoryQueryResponse>>
    {

    }

    public class GetProductsLaboratoryQueryHandler : IRequestHandler<GetProductsLaboratoryQuery, List<GetProductsLaboratoryQueryResponse>>
    {
        private readonly IProductRepository _productRepository;
        private readonly ICompanyTypeRepository _typeRepository;
        private readonly IMapper _mapper;

        public GetProductsLaboratoryQueryHandler(IProductRepository productRepository, ICompanyTypeRepository typeRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _typeRepository = typeRepository;
            _mapper = mapper;
        }

        public async Task<List<GetProductsLaboratoryQueryResponse>> Handle(GetProductsLaboratoryQuery request, CancellationToken cancellationToken)
        {
            var result = await GetAllProducts();

            return result;
        }

        public async Task<List<GetProductsLaboratoryQueryResponse>> GetAllProducts()
        {
            var products = await _productRepository.GetAllWithIncludeAsync(new List<string>() { "Company" });
            var laboratory = await _typeRepository.GetByNameAsync("Laboratorio");

            List<GetProductsLaboratoryQueryResponse> response = products.Where(p => p.Company.CompanyTypeId == laboratory.Id).Select(p => new GetProductsLaboratoryQueryResponse()
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