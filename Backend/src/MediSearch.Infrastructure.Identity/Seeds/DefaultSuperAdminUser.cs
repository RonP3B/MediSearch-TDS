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
    public static class DefaultSuperAdminUser
    {
        public static async Task SeedAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            ApplicationUser defaultUser = new();
            defaultUser.UserName = "superAdminUser";
            defaultUser.Email = "superadminuser@email.com";
            defaultUser.FirstName = "David";
            defaultUser.LastName = "de la Rosa";
            defaultUser.Country = "República Dominicana";
            defaultUser.City = "Santo Domingo";
            defaultUser.Address = "Brisas del Este";
            defaultUser.UrlImage = "no hay por ahora";
            defaultUser.EmailConfirmed = true;
            defaultUser.PhoneNumberConfirmed = true;

            if(userManager.Users.All(u=> u.Id != defaultUser.Id))
            {
                var user = await userManager.FindByEmailAsync(defaultUser.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(defaultUser, "1505Pa@@word");
                    await userManager.AddToRoleAsync(defaultUser, Roles.Client.ToString());
                    await userManager.AddToRoleAsync(defaultUser, Roles.Administrator.ToString());
                    await userManager.AddToRoleAsync(defaultUser, Roles.Doctor.ToString());
					await userManager.AddToRoleAsync(defaultUser, Roles.Manager.ToString());

				}
			}
         
        }
    }
}
