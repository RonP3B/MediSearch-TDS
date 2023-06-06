using AutoMapper;
using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Features.Account.Commands.AuthenticateCommand;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Mappings
{
	public class GeneralProfile : Profile
	{
		public GeneralProfile()
		{
			#region Account
			CreateMap<AuthenticationRequest, AuthenticateCommand>()
				.ReverseMap();
			#endregion
		}

	}
}
