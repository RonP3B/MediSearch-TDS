using AutoMapper;
using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Features.Account.Commands.Authenticate;
using MediSearch.Core.Application.Features.Account.Commands.RegisterClient;
using MediSearch.Core.Application.Features.Account.Commands.RegisterCompany;
using MediSearch.Core.Application.Features.Admin.Commands.RegisterEmployee;
using MediSearch.Core.Application.Features.Product.CreateProduct;
using MediSearch.Core.Domain.Entities;
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

            CreateMap<RegisterEmployeeRequest, RegisterEmployeeCommand>()
                .ReverseMap();
            #endregion

            #region Product
            CreateMap<Product, CreateProductCommand>()
                .ForMember(x => x.Images, opt => opt.Ignore())
                .ReverseMap()
                .ForMember(x => x.UrlImages, opt => opt.Ignore());
            #endregion
        }

    }
}
