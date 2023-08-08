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
    public class FavoriteProductRepository : GenericRepository<FavoriteProduct>, IFavoriteProductRepository
    {
        private readonly ApplicationContext _dbContext;
        public FavoriteProductRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

    }
}
