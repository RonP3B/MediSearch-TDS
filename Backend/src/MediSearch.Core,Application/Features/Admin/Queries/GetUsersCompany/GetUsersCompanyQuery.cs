using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Interfaces.Services;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Admin.Queries.GetUsersCompany
{
    public class GetUsersCompanyQuery : IRequest<List<UserDTO>>
    {

    }

    public class GetUsersCompanyQueryHandler : IRequestHandler<GetUsersCompanyQuery, List<UserDTO>>
    {
        private readonly IAccountService _accountService;
        public GetUsersCompanyQueryHandler(IAccountService accountService)
        {
            _accountService = accountService;
        }

        public async Task<List<UserDTO>> Handle(GetUsersCompanyQuery request, CancellationToken cancellationToken)
        {
            var users = await _accountService.GetUsersByCompany();

            return users;
        }
    }
}