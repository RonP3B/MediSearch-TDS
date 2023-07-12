using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Dtos.Replie
{
    public class ReplieDTO
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public string OwnerName { get; set; }
        public string OwnerImage { get; set; }
    }
}
