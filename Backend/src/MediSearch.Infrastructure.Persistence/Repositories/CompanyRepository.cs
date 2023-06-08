using MediSearch.Core.Application.Interfaces.Repositories;
using MediSearch.Core.Domain.Entities;
using MediSearch.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MediSearch.Infrastructure.Persistence.Repositories
{
    public class CompanyRepository : GenericRepository<Company>, ICompanyRepository
    {
        private readonly ApplicationContext _dbContext;

        public CompanyRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

    }
}
