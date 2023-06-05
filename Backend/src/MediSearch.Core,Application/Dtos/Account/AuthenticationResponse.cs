using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Dtos.Account
{
    public class AuthenticationResponse
    {
        public bool HasError { get; set; }
        public string Error { get; set; }
        public string JWToken { get; set; }
        [JsonIgnore]
        public string RefreshToken { get; set; }
		[JsonIgnore]
		public string UserId { get; set; }
		[JsonIgnore]
		public string CompanyId { get; set; }
	}
}
