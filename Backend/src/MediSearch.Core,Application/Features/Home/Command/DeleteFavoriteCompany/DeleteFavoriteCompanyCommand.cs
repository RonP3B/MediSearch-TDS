using MediatR;
using MediSearch.Core.Application.Dtos.Company;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Helpers;
using MediSearch.Core.Application.Interfaces.Repositories;

namespace MediSearch.Core.Application.Features.Home.Command.DeleteFavoriteCompany
{
    public class DeleteFavoriteCompanyCommand : IRequest<ProductResponse>
    {
        public string Id { get; set; }
    }

    public class DeleteFavoriteCompanyCommandHandler : IRequestHandler<DeleteFavoriteCompanyCommand, ProductResponse>
    {
        private readonly IFavoriteCompanyRepository _favoriteCompanyRepository;

        public DeleteFavoriteCompanyCommandHandler(IFavoriteCompanyRepository favoriteCompanyRepository)
        {
            _favoriteCompanyRepository = favoriteCompanyRepository;
        }


        public async Task<ProductResponse> Handle(DeleteFavoriteCompanyCommand command, CancellationToken cancellationToken)
        {
            ProductResponse response = new()
            {
                HasError = false
            };

            try
            {
                var company = await _favoriteCompanyRepository.GetByIdAsync(command.Id);
                if (company == null)
                {
                    throw new Exception("Empresa no encontrada");
                }

                await _favoriteCompanyRepository.DeleteAsync(company);
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
