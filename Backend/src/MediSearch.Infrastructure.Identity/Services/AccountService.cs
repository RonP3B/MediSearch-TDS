using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Domain.Settings;
using MediSearch.Core_Application.Dtos.Account;
using MediSearch.Core_Application.Interfaces.Services;
using MediSearch.Infrastructure.Identity.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Infrastructure.Identity.Services
{
	public class AccountService : IAccountService
	{

		private readonly UserManager<ApplicationUser> _userManager;
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly IEmailService _emailService;
		private readonly JWTSettings _jwtSettings;
		private readonly RefreshJWTSettings _refreshSettings;

		public AccountService(
			  UserManager<ApplicationUser> userManager,
			  SignInManager<ApplicationUser> signInManager,
			  IEmailService emailService,
			  IOptions<JWTSettings> jwtSettings,
			  IOptions<RefreshJWTSettings> refreshSettings
			)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_emailService = emailService;
			_jwtSettings = jwtSettings.Value;
			_refreshSettings = refreshSettings.Value;
		}

		public async Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request)
		{
			AuthenticationResponse response = new();

			var user = await _userManager.FindByNameAsync(request.UserName);
			if (user == null)
			{
				response.HasError = true;
				response.Error = $"No existe una cuenta registrada con este usuario: {request.UserName}";
				return response;
			}

			var result = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);
			if (!result.Succeeded)
			{
				response.HasError = true;
				response.Error = $"Credenciales invalidas para el usuario: {request.UserName}";
				return response;
			}

			var jwtSecurityToken = await GenerateJWToken(user.Id);
			var refreshToken = GenerateRefreshToken(user.Id);

			response.JWToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
			response.UserId = user.Id;			
			response.RefreshToken = new JwtSecurityTokenHandler().WriteToken(refreshToken);

			return response;
		}

		public async Task<JwtSecurityToken> GenerateJWToken(string userId)
		{
			var user = await _userManager.FindByIdAsync(userId);
			var userClaims = await _userManager.GetClaimsAsync(user);
			var roles = await _userManager.GetRolesAsync(user);

			var roleClaims = new List<Claim>();

			foreach (var role in roles)
			{
				roleClaims.Add(new Claim("roles", role));
			}

			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub,user.UserName),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(JwtRegisteredClaimNames.Email,user.Email),
				new Claim("uid", user.Id)
			}
			.Union(userClaims)
			.Union(roleClaims);

			var symmectricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
			var signingCredetials = new SigningCredentials(symmectricSecurityKey, SecurityAlgorithms.HmacSha256);

			var jwtSecurityToken = new JwtSecurityToken(
				issuer: _jwtSettings.Issuer,
				audience: _jwtSettings.Audience,
				claims: claims,
				expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
				signingCredentials: signingCredetials);

			return jwtSecurityToken;
		}

		public JwtSecurityToken GenerateRefreshToken(string userId)
		{
			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim("uid", userId)
			};

			var symmectricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_refreshSettings.Key));
			var signingCredetials = new SigningCredentials(symmectricSecurityKey, SecurityAlgorithms.HmacSha256);

			var jwtSecurityToken = new JwtSecurityToken(
				issuer: _refreshSettings.Issuer,
				audience: _refreshSettings.Audience,
				claims: claims,
				expires: DateTime.UtcNow.AddMinutes(_refreshSettings.DurationInDays),
				signingCredentials: signingCredetials);

			return jwtSecurityToken;
		}

		public string ValidateRefreshToken(string token)
		{
			string userId = "";
			JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
			TokenValidationParameters tokenValidationParameters = new TokenValidationParameters
			{
				ValidateIssuerSigningKey = true,
				ValidateIssuer = true,
				ValidateAudience = true,
				ValidateLifetime = true,
				ClockSkew = TimeSpan.Zero,
				ValidIssuer = _refreshSettings.Issuer,
				ValidAudience = _refreshSettings.Audience,
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_refreshSettings.Key))
			};

			try
			{
				ClaimsPrincipal claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken validatedToken);

                if (validatedToken != null)
                {
					var id = claimsPrincipal.FindFirst("uid");
					userId = id.Value;
                }
            }
			catch (SecurityTokenValidationException ex)
			{
				return "Error de validación del token JWT: " + ex.Message;
			}catch (Exception ex)
			{
				return "Error al decodificar el token JWT: " + ex.Message;
			}

			return userId;
		}

	}
}
