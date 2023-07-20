using MediSearch.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Chat.Queries.GetChat
{
    public class GetChatQueryResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }   
        public List<Message> Messages { get; set; }
    }
}
