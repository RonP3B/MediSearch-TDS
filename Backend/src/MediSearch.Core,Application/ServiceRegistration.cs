using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using MediSearch.Core.Application.Interfaces.Services;
using MediatR;
using MediSearch.Core.Application.Services;
using MediSearch.Core.Application.Services.Product;

namespace MediSearch.Core.Application
{
	public static class ServiceRegistration
	{
		public static void AddApplicationLayer(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddAutoMapper(Assembly.GetExecutingAssembly());
			services.AddMediatR(Assembly.GetExecutingAssembly());
			#region Services
			services.AddTransient(typeof(IGenericServices<,>), typeof(GenericServices<,,>));
			services.AddScoped<IProductService, ProductServices>();
			#endregion
		}
	}
}
