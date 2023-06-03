﻿using MediSearch.Core.Domain.Settings;
using MediSearch.Core_Application.Dtos.Account;
using MediSearch.Infrastructure.Identity.Contexts;
using MediSearch.Infrastructure.Identity.Entities;
using MediSearch.Infrastructure.Identity.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Infrastructure.Identity
{
	public static class ServiceRegistratiom
	{
		public static void AddIdentityInfrastructure(this IServiceCollection services, IConfiguration configuration)
		{
			var connection = configuration.GetConnectionString("PostgreSQL");
			var password = Environment.GetEnvironmentVariable("PassCockroachDB");
			var host = Environment.GetEnvironmentVariable("HostCockroachDB");
			connection = connection.Replace("#", password);
			connection = connection.Replace("ServerHost", host);

			#region Contexts
			if (configuration.GetValue<bool>("UseInMemoryDatabase"))
			{
				services.AddDbContext<IdentityContext>(options => options.UseInMemoryDatabase("MediSearchDb"));
			}
			else
			{
				services.AddDbContext<IdentityContext>(options =>
				{
					options.EnableSensitiveDataLogging();
					options.UseNpgsql(connection,
					m => m.MigrationsAssembly(typeof(IdentityContext).Assembly.FullName));
				});
			}
			#endregion

			#region Identity
			services.AddIdentity<ApplicationUser, IdentityRole>()
				.AddEntityFrameworkStores<IdentityContext>().AddDefaultTokenProviders();

			services.ConfigureApplicationCookie(options =>
			{
				options.LoginPath = "/User";
				options.AccessDeniedPath = "/User/AccessDenied";
			});

			services.Configure<JWTSettings>(configuration.GetSection("JWTSettings"));

			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options =>
			{
				options.RequireHttpsMetadata = false;
				options.SaveToken = false;
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ClockSkew = TimeSpan.Zero,
					ValidIssuer = configuration["JWTSettings:Issuer"],
					ValidAudience = configuration["JWTSettings:Audience"],
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWTSettings:Key"]))
				};
				options.Events = new JwtBearerEvents()
				{
					OnAuthenticationFailed = c =>
					{
						c.NoResult();
						c.Response.StatusCode = 500;
						c.Response.ContentType = "text/plain";
						return c.Response.WriteAsync(c.Exception.ToString());
					},
					OnChallenge = c =>
					{
						c.HandleResponse();
						c.Response.StatusCode = 401;
						c.Response.ContentType = "application/json";
						var result = JsonConvert.SerializeObject(new JwtResponse { HasError = true, Error = "Usted no se ha logueado" });
						return c.Response.WriteAsync(result);
					},
					OnForbidden = c =>
					{
						c.Response.StatusCode = 403;
						c.Response.ContentType = "application/json";
						var result = JsonConvert.SerializeObject(new JwtResponse { HasError = true, Error = "Usted no está autorizado para usar este endpoint" });
						return c.Response.WriteAsync(result);
					}
				};

			});
			#endregion

			#region Services
			services.AddTransient<IAccountService, AccountService>();
			#endregion
		}
	}
}