using MediSearch.Core_Application.Interfaces.Repositories;
using MediSearch.Infrastructure.Persistence.Contexts;
using MediSearch.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Infrastructure.Persistence
{
	public static class ServiceRegistration
	{
		public static void AddPersistenceInfrastructure(this IServiceCollection services, IConfiguration configuration)
		{
			#region Contexts
			if (configuration.GetValue<bool>("UseInMemoryDatabase"))
			{
				services.AddDbContext<ApplicationContext>(options => options.UseInMemoryDatabase("ApplicationDb"));
			}
			else
			{
				services.AddDbContext<ApplicationContext>(options =>
				{
					options.EnableSensitiveDataLogging();
					options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"),
					m => m.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName));
				});
			}
			#endregion

			#region Repositories

			services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
			#endregion
		}
	}
}
