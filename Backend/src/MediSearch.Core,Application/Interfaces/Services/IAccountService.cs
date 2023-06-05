using MediSearch.Core.Application.Dtos.Account;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core_Application.Interfaces.Services
{
	public interface IAccountService
	{
		Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request);
		Task<JwtSecurityToken> GenerateJWToken(string userId);
		JwtSecurityToken GenerateRefreshToken(string userId);
		string ValidateRefreshToken(string token);
	}
}
