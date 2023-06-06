﻿using MediSearch.Core.Application.Enums;
using MediSearch.Infrastructure.Identity.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Infrastructure.Identity.Seeds
{
	public static class DefaultRoles
	{
		public static async Task SeedAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
		{
			await roleManager.CreateAsync(new IdentityRole(Roles.Administrator.ToString()));
			await roleManager.CreateAsync(new IdentityRole(Roles.Manager.ToString()));
			await roleManager.CreateAsync(new IdentityRole(Roles.Doctor.ToString()));
			await roleManager.CreateAsync(new IdentityRole(Roles.Client.ToString()));
		}
	}
}
