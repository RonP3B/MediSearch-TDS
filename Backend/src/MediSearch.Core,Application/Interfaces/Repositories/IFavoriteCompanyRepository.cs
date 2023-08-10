using MediSearch.Core.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Interfaces.Repositories
{
    public interface IFavoriteCompanyRepository : IGenericRepository<FavoriteCompany>
    {
        Task<FavoriteCompany> ValidateFavorite(string company, string user);
    }
}
