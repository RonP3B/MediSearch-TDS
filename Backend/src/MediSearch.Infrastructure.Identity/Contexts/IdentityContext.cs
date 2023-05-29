using MediSearch.Infrastructure.Identity.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Infrastructure.Identity.Contexts
{
	public class IdentityContext : IdentityDbContext<ApplicationUser>
	{
		//Aquí van las configuraciones para el contexto de identity
	}
}
