using MediSearch.Core.Application.Interfaces.Repositories;
using MediSearch.Core.Domain.Entities;
using MediSearch.Infrastructure.Persistence.Contexts;

namespace MediSearch.Infrastructure.Persistence.Repositories
{
    public class FavoriteProductRepository : GenericRepository<FavoriteProduct>, IFavoriteProductRepository
    {
        private readonly ApplicationContext _dbContext;
        public FavoriteProductRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<FavoriteProduct> ValidateFavorite(string product, string user)
        {
            var products = await GetAllAsync();
            var favorite = products.Find(x => x.ProductId == product && x.UserId == user);

            return favorite;
        }
    }
}
