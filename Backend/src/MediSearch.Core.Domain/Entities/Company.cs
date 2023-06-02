using MediSearch.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Domain.Entities
{
	public class Company : AuditableBaseEntity
	{
		public string Ceo { get; set; }
		public string Name { get; set; }
		public string urlImage { get; set; }
		public string Country { get; set; }
		public string City { get; set; }
		public string Address { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
        public string? WebSite { get; set; }
        public string? Facebook { get; set; }
        public string? Instagram { get; set; }
        public string? Twitter { get; set; }

        //Navigation Properties
        public CompanyType CompanyType { get; set; }
		public string CompanyId { get; set;}
        public ICollection<Product> Products { get; set; }
        public ICollection<CompanyUser>  CompanyUsers { get; set; }

    }
}
