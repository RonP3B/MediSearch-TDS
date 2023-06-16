using MediatR;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Product.Queries.GetAllProduct
{
    internal class GetAllProductQueryHandler : IRequestHandler<GetAllProductQuery, IList<ProductResponse>>
    {
        private readonly IProductRepository _productRepository;

        public GetAllProductQueryHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IList<ProductResponse>> Handle(GetAllProductQuery request, CancellationToken cancellationToken)
        {
            var response = await _productRepository.GetAllAsync();

            return response.Select(x => new ProductResponse(
                x.Name,
                x.Description,
                x.Categories,
                x.Components,
                x.Price,
                x.Quantity,
                x.UrlImages!,
                x.CompanyId)).ToList();

        }
    }
}
