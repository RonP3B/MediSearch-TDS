using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Domain.Settings;
using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Interfaces.Services;
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
using MediSearch.Core.Application.Dtos.Email;
using MediSearch.Core.Application.Enums;
using Microsoft.AspNetCore.WebUtilities;

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
			var users = GetAllUsers();

			var user = await _userManager.FindByNameAsync(request.UserName);
			if (user == null)
			{
				response.HasError = true;
				response.Error = $"No existe una cuenta registrada con este usuario: {request.UserName}";
				return response;
			}

			var isConfirmed = await _userManager.IsEmailConfirmedAsync(user);
			if (!isConfirmed)
			{
				response.HasError = true;
				response.Error = "El usuario no ha confirmado su cuenta. Revise su correo electrónico";
				return response;
			}

			var result = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);
			if (!result.Succeeded)
			{
				response.HasError = true;
				response.Error = $"Credenciales invalidas para el usuario: {request.UserName}";
				return response;
			}

			response.JWToken = await GenerateJWToken(user.Id);
			response.UserId = user.Id;
			response.RefreshToken = GenerateRefreshToken(user.Id);

			return response;
		}

		public async Task<RegisterResponse> RegisterClientUserAsync(RegisterRequest request, string origin)
		{
			RegisterResponse response = await ValidateUserBeforeRegistrationAsync(request);
			if (response.HasError)
			{
				return response;
			}

			var user = new ApplicationUser
			{
				Email = request.Email,
				FirstName = request.FirstName,
				LastName = request.LastName,
				UserName = request.UserName,
				PhoneNumber = request.PhoneNumber,
				UrlImage = request.UrlImage,
				Country = request.Country,
				City = request.City,
				Address = request.Address
			};

			var result = await _userManager.CreateAsync(user, request.Password);
			if (result.Succeeded)
			{
				await _userManager.AddToRoleAsync(user, Roles.Client.ToString());
				var verificationUri = await SendVerificationEmailUri(user, origin);
				await _emailService.SendAsync(new EmailRequest()
				{
					To = user.Email,
					Body = MakeEmailForConfirm(verificationUri, user.FirstName + " " + user.LastName),
					Subject = "Confirmar registro"
				});
			}
			else
			{
				foreach (var error in result.Errors)
				{
					response.Error += $"{error.Description}";
				}
				response.HasError = true;
				return response;
			}
			response.IsSuccess = true;
			return response;
		}

		public async Task<ConfirmEmailResponse> ConfirmEmailAsync(string userId, string token)
		{
			ConfirmEmailResponse response = new()
			{
				HasError = false
			}; 
			var user = await _userManager.FindByIdAsync(userId);
			if (user == null)
			{
				response.HasError = true;
				response.Error = "No existe cuenta registrada con este usuario";
				return response;
			}

			token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));
			var result = await _userManager.ConfirmEmailAsync(user, token);
			if (result.Succeeded)
			{
				await _emailService.SendAsync(new EmailRequest()
				{
					To = user.Email,
					Body = MakeEmailForConfirmed(user.FirstName + " " + user.LastName),
					Subject = "Cuenta confirmada"
				});
				return response;
			}
			else
			{
				response.HasError = true;
				response.Error = $"Ocurrió un error mientras se confirmaba la cuenta para el correo: {user.Email}";
				return response;
			}
		}

		public async Task<string> GenerateJWToken(string userId)
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


			string token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
			return token;
		}

		public string GenerateRefreshToken(string userId)
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
				expires: DateTime.UtcNow.AddDays(_refreshSettings.DurationInDays),
				signingCredentials: signingCredetials);

			string token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

			return token;
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

				if (validatedToken == null)
				{
					return "Error: El token no es válido";
				}
				var id = claimsPrincipal.FindFirst("uid");
				userId = id.Value;
			}
			catch (SecurityTokenValidationException ex)
			{
				return "Error de validación del token JWT: " + ex.Message;
			}
			catch (Exception ex)
			{
				return "Error al decodificar el token JWT: " + ex.Message;
			}

			return userId;
		}

		#region Private Methods
		private async Task<RegisterResponse> ValidateUserBeforeRegistrationAsync(RegisterRequest request)
		{
			RegisterResponse response = new()
			{
				HasError = false
			};
			var user = _userManager.Users.ToList();

			var userWithSameUserName = await _userManager.FindByNameAsync(request.UserName);
			if (userWithSameUserName != null)
			{
				response.HasError = true;
				response.Error = $"El nombre de usuario '{request.UserName}' ya está siendo usado.";
				return response;
			}

			var userWithSameEmail = await _userManager.FindByEmailAsync(request.Email);
			if (userWithSameEmail != null)
			{
				response.HasError = true;
				response.Error = $"El correo '{request.Email}' ya está siendo usado.";
				return response;
			}

			return response;
		}

		private async Task<string> SendVerificationEmailUri(ApplicationUser user, string origin)
		{
			var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
			code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
			var route = "api/v1/Account/confirm-email";
			var Uri = new Uri(string.Concat($"{origin}/", route));
			var verificationUri = QueryHelpers.AddQueryString(Uri.ToString(), "userId", user.Id);
			verificationUri = QueryHelpers.AddQueryString(verificationUri, "token", code);

			return verificationUri;
		}

		private string MakeEmailForConfirm(string verificationUri, string user)
		{
			string htmlBody = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Confirmación de correo</title>
    <style>
        /* Estilos adicionales */
        .button {
            display: inline-block;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            user-select: none;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h1>¡Bienvenid@ name!</h1>
    <p>Confirme su cuenta, pulsando el siguiente botón:</p>
    <a href='Uri'>
        <button class='button'>Confirmar cuenta</button>
    </a>
</body>
</html>
";
			string html = htmlBody.Replace("Uri", verificationUri);
			html = html.Replace("name", user);
			return html;
		}

		private string MakeEmailForConfirmed(string user)
		{
			string htmlBody = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Cuenta confirmada</title>
    <style>
        /* Estilos adicionales */
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .title {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .message {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1 class='title'>¡Cuenta Confirmada!</h1>
        </div>
        <div class='message'>
            <p>Hola Nombre,</p>
            <p>Te damos la bienvenida a nuestra comunidad. Gracias por confirmar tu cuenta.</p>
            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
            <p>¡Disfruta de la aplicación y que tengas un gran día!</p>
        </div>
        <div class='footer'>
            <p>Atentamente,</p>
            <p>El equipo de MediSearch</p>
        </div>
    </div>
</body>
</html>
";
			string html = htmlBody.Replace("Nombre", user);
			return html;
		}

		private async Task<List<ApplicationUser>> GetAllUsers()
		{
			var list = _userManager.Users.ToList();

			return list;
		}
		#endregion

	}
}
