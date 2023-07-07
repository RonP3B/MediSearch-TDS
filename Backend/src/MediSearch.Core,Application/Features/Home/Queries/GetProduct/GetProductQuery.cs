using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Home.Queries.GetProduct
{
    public class GetProductQuery : IRequest<GetProductQueryResponse>
    {
        public string Id { get; set; }
    }

    public class GetProductQueryHandler : IRequestHandler<GetProductQuery, GetProductQueryResponse>
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public GetProductQueryHandler(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<GetProductQueryResponse> Handle(GetProductQuery request, CancellationToken cancellationToken)
        {
            var result = await GetProductById(request.Id);

            return result;
        }

        public async Task<GetProductQueryResponse> GetProductById(string id)
        {
            var products = await _productRepository.GetAllWithIncludeAsync(new List<string>() { "Company" });
            GetProductQueryResponse response = products.Where(p => p.Id == id).Select(p => new GetProductQueryResponse()
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Categories = p.Categories,
                Components = p.Components,
                Price = p.Price,
                Images = p.UrlImages,
                Available = p.Quantity > 0,
                NameCompany = p.Company.Name,
                Ceo = p.Company.Ceo,
                Address = p.Company.Address,
                Email = p.Company.Email,
                Facebook = p.Company.Facebook,
                Instagram = p.Company.Instagram,
                Logo = p.Company.UrlImage,
                Municipality = p.Company.Municipality,
                Phone = p.Company.Phone,
                Province = p.Company.Province,
                Twitter = p.Company.Twitter,
                WebSite = p.Company.WebSite
            }).FirstOrDefault();

            return response;
        }

    }
}
