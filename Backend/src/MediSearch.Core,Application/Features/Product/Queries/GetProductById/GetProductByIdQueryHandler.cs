using MediatR;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Product.Queries.GetProductById
{
    internal class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDTO>
    {
        private readonly IProductRepository _productRepository;

        public GetProductByIdQueryHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ProductDTO> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            var response = await _productRepository.GetByIdAsync(request.Id);

            if (response is null)
                throw new Exception("El producto no existe");

            return new ProductDTO(
                response.Name,
                response.Description,
                response.Categories,
                response.Components,
                response.Price,
                response.Quantity,
                response.UrlImages!,
                response.CompanyId
                );

        }
    }
}
