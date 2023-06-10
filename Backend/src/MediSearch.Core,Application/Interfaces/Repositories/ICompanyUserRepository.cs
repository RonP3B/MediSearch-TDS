using MediSearch.Core.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Interfaces.Repositories
{
    public interface ICompanyUserRepository : IGenericRepository<CompanyUser>
    {
        Task<CompanyUser> GetByUserAsync(string user);
    }
}
