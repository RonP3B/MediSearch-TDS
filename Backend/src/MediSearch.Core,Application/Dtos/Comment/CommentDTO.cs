using MediSearch.Core.Application.Dtos.Replie;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Dtos.Comment
{
    public class CommentDTO
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public string OwnerName { get; set; }
        public string OwnerImage { get; set; }
        public List<ReplieDTO> Replies { get; set; }
    }
}
