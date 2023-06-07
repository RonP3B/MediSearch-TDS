using MediatR;
using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Features.Account.Commands.AuthenticateCommand;
using MediSearch.Core.Application.Features.Account.Commands.ConfirmCodeCommand;
using MediSearch.Core.Application.Features.Account.Commands.ConfirmEmailCommand;
using MediSearch.Core.Application.Features.Account.Commands.RegisterClientCommand;
using MediSearch.Core.Application.Features.Account.Commands.ResetPasswordCommand;
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
		[ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(AuthenticationResponse))]
		[SwaggerOperation(
		   Summary = "Iniciar sesión",
		   Description = "Autentica al usuario y devuelve un JWT Token"
		)]
		[Consumes(MediaTypeNames.Application.Json)]
		public async Task<IActionResult> Authenticate([FromBody] AuthenticateCommand command)
		{
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
				if (response.Error.Contains("correo"))
				{
					return StatusCode(StatusCodes.Status401Unauthorized, response.Error);
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

			HttpContext.Session.Set("userId", response.UserId);
			if (response.CompanyId != null)
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

		[HttpPost("register-client")]
		[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RegisterResponse))]
		[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(RegisterResponse))]
		[SwaggerOperation(
		   Summary = "Registro de usuario cliente",
		   Description = "Registra a un usuario de tipo cliente"
		)]
		public async Task<IActionResult> RegisterClient([FromForm] RegisterClientCommand command)
		{
			var response = await Mediator.Send(command);

			if (!ModelState.IsValid)
			{
				return BadRequest();
			}

			if (response.HasError)
			{
				return BadRequest(response.Error);
			}

			return Ok(response.IsSuccess);
		}

		[HttpGet("confirm-email")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ConfirmEmailResponse))]
		[ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ConfirmEmailResponse))]
		[SwaggerOperation(
		   Summary = "Comfirmar al usuario ",
		   Description = "Confirma la cuenta del usuario"
		)]
		public async Task<IActionResult> ConfirmEmail(string userId, string token)
		{
			ConfirmEmailCommand command = new()
			{
				UserId = userId,
				Token = token
			};
			var response = await Mediator.Send(command);

			if (response.HasError)
			{
				if (response.Error.Contains("error"))
				{
					return StatusCode(StatusCodes.Status500InternalServerError, response.Error);
				}
				return NotFound(response.Error);
			}

			return Redirect("thanks");
		}

		[HttpGet("thanks")]
		public IActionResult Thanks()
		{
			string html = @"<!DOCTYPE html>
                    <html>
                    <head>
                        <title>Gracias por confirmar</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f5f5f5;
                                text-align: center;
                                padding: 50px;
                            }

                            h1 {
                                color: #333;
                            }

                            p {
                                color: #666;
                            }

                            .container {
                                max-width: 400px;
                                margin: 0 auto;
                                background-color: #fff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <h1>¡Gracias por confirmar tu cuenta!</h1>
                            <p>Tu cuenta ha sido confirmada exitosamente. Ahora puedes acceder a todas las funcionalidades de nuestro sitio.</p>
                        </div>
                    </body>
                    </html>";
			return Content(html, "text/html");
		}

		[HttpPost("reset-password")]
		[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResetPasswordResponse))]
		[ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResetPasswordResponse))]
		[ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ResetPasswordResponse))]
		[SwaggerOperation(
			Summary = "Restablecer contraseña",
			Description = "Permite que el usuario cambie su contraseña si se le olvidó"
			)]
		public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command)
		{
			var response = await Mediator.Send(command);

			if (response.HasError)
			{
				if (response.Error.Contains("error"))
				{
					return StatusCode(StatusCodes.Status500InternalServerError, response.Error);
				}
				return NotFound(response.Error);
			}

			return Ok(response.IsSuccess);
		}

		[HttpPost("confirm-code")]
		[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ConfirmCodeResponse))]
		[ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ConfirmCodeResponse))]
		[ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ConfirmCodeResponse))]
		[SwaggerOperation(
			Summary = "Confirmar código",
			Description = "Permite que el usuario ingrese el código de confirmación que se le envió por correo"
			)]
		public async Task<IActionResult> ConfirmCode([FromBody] ConfirmCodeCommand command)
		{
			var response = await Mediator.Send(command);

			if (response.HasError)
			{
				if (response.Error.Contains("error"))
				{
					return StatusCode(StatusCodes.Status500InternalServerError, response.Error);
				}
				return NotFound(response.Error);
			}

			return Ok(response.IsSuccess);
		}

		[HttpPost("change-password")]
		[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResetPasswordResponse))]
		[ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ResetPasswordResponse))]
		[SwaggerOperation(
			Summary = "Restablecer contraseña",
			Description = "Permite que el usuario cambie su contraseña si se le olvidó"
			)]
		public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordCommand command)
		{
			var response = await Mediator.Send(command);

			if (response.HasError)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, response.Error);
			}

			HttpContext.Session.Remove("user");
			HttpContext.Session.Remove("confirmCode");

			return Ok(response.IsSuccess);
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
			HttpContext.Session.Remove("userId");
			HttpContext.Session.Remove("company");

			return NoContent();
		}
	}
}