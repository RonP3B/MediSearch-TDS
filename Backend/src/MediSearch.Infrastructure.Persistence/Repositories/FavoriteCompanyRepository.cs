using MediSearch.Core.Application.Interfaces.Repositories;
using MediSearch.Core.Domain.Entities;
using MediSearch.Infrastructure.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Infrastructure.Persistence.Repositories
{
    public class FavoriteCompanyRepository : GenericRepository<FavoriteCompany>, IFavoriteCompanyRepository
    {
        private readonly ApplicationContext _dbContext;
        public FavoriteCompanyRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<FavoriteCompany> ValidateFavorite(string company, string user)
        {
            var companies = await GetAllWithIncludeAsync(new List<string>());
            var favorite = companies.Find(x => x.CompanyId == company && x.UserId == user);

            return favorite;
        }

    }
}
