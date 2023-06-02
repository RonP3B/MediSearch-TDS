using MediSearch.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Domain.Entities
{
	public class HallType : AuditableBaseEntity
	{
        public string Name { get; set; }

        //Navigation Properties
        public ICollection<Hall> Halls { get; set; }
    }
}
