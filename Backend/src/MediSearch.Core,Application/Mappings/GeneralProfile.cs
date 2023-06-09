using AutoMapper;
using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Features.Account.Commands.AuthenticateCommand;
using MediSearch.Core.Application.Features.Account.Commands.RegisterClientCommand;
using MediSearch.Core.Application.Features.Account.Commands.RegisterCompanyCommand;
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

			CreateMap<RegisterRequest, RegisterClientCommand>()
				.ForMember(x => x.Image, opt => opt.Ignore())
				.ReverseMap()
				.ForMember(x => x.UrlImage, opt => opt.Ignore());

            CreateMap<RegisterCompanyRequest, RegisterCompanyCommand>()
                .ForMember(x => x.Image, opt => opt.Ignore())
				.ForMember(x => x.ImageLogo, opt => opt.Ignore())
				.ForMember(x => x.CompanyType, opt => opt.Ignore())
                .ReverseMap()
                .ForMember(x => x.UrlImage, opt => opt.Ignore())
				.ForMember(x => x.UrlImageLogo, opt => opt.Ignore())
				.ForMember(x => x.CompanyTypeId, opt => opt.Ignore());
            #endregion
        }

	}
}
