using MediSearch.Core.Application;
using MediSearch.Infrastructure.Identity;
using MediSearch.Infrastructure.Persistence;
using MediSearch.Infrastructure.Shared;
using MediSearch.WebApi.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;
using System.Text.Json.Serialization;

namespace MediSearch.WebApi
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddApplicationLayer(Configuration);
			services.AddPersistenceInfrastructure(Configuration);
			services.AddIdentityInfrastructure(Configuration);
			services.AddSharedInfrastructure(Configuration);
			services.AddEndpointsApiExplorer();
			services.AddSwaggerGen();
			services.AddControllers(options =>
			{
				options.Filters.Add(new ProducesAttribute("application/json"));
			}).ConfigureApiBehaviorOptions(options =>
			{
				options.SuppressInferBindingSourcesForParameters = true;
				options.SuppressMapClientErrors = true;
			})
			.AddJsonOptions(x =>
					  x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

			services.AddHealthChecks();
			services.AddSwaggerExtension();
			services.AddApiVersioningExtension();
			services.AddDistributedMemoryCache();
			services.AddSession();
			
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				app.UseHsts();
			}

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();
			app.UseSwaggerExtension();
			app.UseHealthChecks("/health");
			app.UseSession();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
