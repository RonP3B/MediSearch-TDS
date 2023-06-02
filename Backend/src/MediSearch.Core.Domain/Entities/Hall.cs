using MediSearch.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Domain.Entities
{
	public class Hall : AuditableBaseEntity
	{
        public DateTime Date { get; set; }

        //Navigation Properties
        public HallType HallType { get; set; }
        public string HallTypeId { get; set; }
        public ICollection<Message> Messages { get; set; }
        public ICollection<HallUser> HallUsers { get; set; }
    }
}
