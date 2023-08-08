using MediatR;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Helpers;
using MediSearch.Core.Application.Interfaces.Repositories;

namespace MediSearch.Core.Application.Features.Home.Command.DeleteFavoriteProduct
{
    public class DeleteFavoriteProductCommand : IRequest<ProductResponse>
    {
        public string Id { get; set; }
    }

    public class DeleteFavoriteProductCommandHandler : IRequestHandler<DeleteFavoriteProductCommand, ProductResponse>
    {
        private readonly IFavoriteProductRepository _favoriteProductRepository;

        public DeleteFavoriteProductCommandHandler(IFavoriteProductRepository favoriteProductRepository)
        {
            _favoriteProductRepository = favoriteProductRepository;
        }


        public async Task<ProductResponse> Handle(DeleteFavoriteProductCommand command, CancellationToken cancellationToken)
        {
            ProductResponse response = new()
            {
                HasError = false
            };

            try
            {
                var product = await _favoriteProductRepository.GetByIdAsync(command.Id);
                if (product == null)
                {
                    throw new Exception("Producto no encontrado");
                }

                await _favoriteProductRepository.DeleteAsync(product);
                response.IsSuccess = true;
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
