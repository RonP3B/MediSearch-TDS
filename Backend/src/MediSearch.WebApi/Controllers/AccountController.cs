using MediatR;
using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Features.Account.Commands.AuthenticateCommand;
using MediSearch.Core.Application.Features.Account.Queries.RefreshAccessTokenQuery;
using MediSearch.Core.Application.Helpers;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net.Mime;

namespace MediSearch.WebApi.Controllers
{
	[ApiController]
	[Route("api/v1/[Controller]")]
	[SwaggerTag("Sistema de membresia")]
	public class AccountController : ControllerBase
	{
		private IMediator _mediator;
		protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

		[HttpPost("login")]
		[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthenticationResponse))]
		[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(AuthenticationResponse))]
		[ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(AuthenticationResponse))]
		[SwaggerOperation(
		   Summary = "Iniciar sesión",
		   Description = "Autentica al usuario y devuelve un JWT Token"
		)]
		[Consumes(MediaTypeNames.Application.Json)]
		public async Task<IActionResult> Authenticate([FromBody] AuthenticateCommand command)
		{
			var origin = Request.Headers["origin"];
			var response = await Mediator.Send(command);

			if (!ModelState.IsValid)
			{
				return BadRequest();
			}

			if (response.HasError)
			{
				if (response.Error.Contains("No existe una cuenta registrada con este usuario"))
				{
					return NotFound(response.Error);
				}
				return BadRequest(response.Error);
			}

			var cookieOptions = new CookieOptions
			{
				HttpOnly = true,
				Secure = true,
				Expires = DateTime.UtcNow.AddDays(5),
				SameSite = SameSiteMode.None
			};
			Response.Cookies.Append("refreshToken", response.RefreshToken, cookieOptions);

			HttpContext.Session.Set("user", response.UserId);
			if(response.CompanyId != null)
			{
				HttpContext.Session.Set("company", response.CompanyId);
			}

			return Ok(response);
		}

		[HttpGet("refresh-access-token")]
		[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthenticationResponse))]
		[ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(AuthenticationResponse))]
		[SwaggerOperation(
		   Summary = "Obtener nuevo access token",
		   Description = "Valida el refresh token y devuelve un JWT Token de acceso nuevo"
		)]
		public async Task<IActionResult> RefreshAccesToken()
		{
			var response = await Mediator.Send(new GetRefreshAccessTokenQuery());

			if (response.HasError)
			{
				return StatusCode(StatusCodes.Status500InternalServerError);
			}

			return Ok(response);
		}

		[HttpGet("logout")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[SwaggerOperation(
		   Summary = "Salir de sesión",
		   Description = "Borra el refresh token"
		)]
		public async Task<IActionResult> Logout()
		{
			Response.Cookies.Delete("refreshToken", new CookieOptions
			{
				HttpOnly = true,
				Secure = true,
				Expires = DateTime.UtcNow.AddDays(5),
				SameSite = SameSiteMode.None
			});
			HttpContext.Session.Remove("user");
			HttpContext.Session.Remove("company");

			return NoContent();
		}
	}
}