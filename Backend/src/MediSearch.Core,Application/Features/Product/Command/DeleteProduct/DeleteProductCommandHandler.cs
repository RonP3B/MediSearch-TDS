using MediatR;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Product.Command.DeleteProduct
{
    internal class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, ProductResponseMessage>
    {

        private readonly IProductRepository _productRepository;

        public DeleteProductCommandHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ProductResponseMessage> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var entityToDelete = await _productRepository.GetByIdAsync(request.Id);

                await _productRepository.DeleteAsync(entityToDelete);

                return new ProductResponseMessage()
                {
                    IsSuccess = true
                };

            }
            catch (Exception ex)
            {
                return new ProductResponseMessage()
                {
                    HasError = true,
                    Error = ex.Message
                };
            }
        }
    }
}
