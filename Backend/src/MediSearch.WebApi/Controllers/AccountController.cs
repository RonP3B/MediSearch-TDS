using MediatR;
using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Features.Account.Commands.Authenticate;
using MediSearch.Core.Application.Features.Account.Commands.ConfirmCode;
using MediSearch.Core.Application.Features.Account.Commands.ConfirmEmail;
using MediSearch.Core.Application.Features.Account.Commands.RegisterClient;
using MediSearch.Core.Application.Features.Account.Commands.RegisterCompany;
using MediSearch.Core.Application.Features.Account.Commands.ResetPassword;
using MediSearch.Core.Application.Features.Account.Commands.ChangePassword;
using MediSearch.Core.Application.Features.Account.Queries.GetRefreshAccessToken;
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
		   Summary = "Iniciar sesi�n",
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

			Response.Cookies.Append("refreshToken", response.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.UtcNow.AddDays(5),
                SameSite = SameSiteMode.None
            });
			Response.Cookies.Append("userId", response.UserId, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.UtcNow.AddDays(5),
                SameSite = SameSiteMode.None
            });
			if(response.CompanyId != null)
			{
                Response.Cookies.Append("company", response.CompanyId, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    Expires = DateTime.UtcNow.AddDays(5),
                    SameSite = SameSiteMode.None
                });
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
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(RegisterResponse))]
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
                if (response.Error.Contains("Error") && !response.Error.Contains("password"))
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, response.Error);
				}
				return BadRequest(response.Error);
			}

			return Ok(response.IsSuccess);
		}

        [HttpPost("register-company")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RegisterResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(RegisterResponse))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(RegisterResponse))]
        [SwaggerOperation(
			Summary = "Registro de empresa",
			Description = "Registra a un usuario de tipo administrador junto con su empresa"
			)]
        public async Task<IActionResult> RegisterCompany([FromForm] RegisterCompanyCommand command)
        {
            var response = await Mediator.Send(command);

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (response.HasError)
            {
                if (response.Error.Contains("Error") && !response.Error.Contains("password"))
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, response.Error);
                }
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

			return RedirectToAction("thanks", new { name = response.NameUser });
		}

		[HttpGet("thanks")]
		public IActionResult Thanks(string name)
		{
            string htmlBody = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Bienvenido/a al Sistema</title>
    <style>
        /* Estilos adicionales */
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f8f8;
            border-radius: 10px;
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
        .footer {
            text-align: center;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1 class='title'>�Bienvenido/a al Sistema!</h1>
        </div>
        <div class='message'>
            <p>Hola [Nombre],</p>
            <p>Gracias por confirmar tu cuenta. Ahora tienes acceso completo a todas las funcionalidades del sistema.</p>
            <p>Disfruta de todas las caracter�sticas y no dudes en ponerte en contacto con nosotros si tienes alguna pregunta o necesitas asistencia.</p>
            <p><a href='[URL]' class='button'>Acceder al Sistema</a></p>
        </div>
        <div class='footer'>
            <p>Atentamente,</p>
            <p>El equipo de MediSearch</p>
        </div>
    </div>
</body>
</html>
";

			string html = htmlBody.Replace("[Nombre]", name);
            return Content(html, "text/html");
		}

		[HttpPost("reset-password")]
		[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResetPasswordResponse))]
		[ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResetPasswordResponse))]
		[ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ResetPasswordResponse))]
		[SwaggerOperation(
			Summary = "Restablecer contrase�a",
			Description = "Permite que el usuario cambie su contrase�a si se le olvid�"
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
			Summary = "Confirmar c�digo",
			Description = "Permite que el usuario ingrese el c�digo de confirmaci�n que se le envi� por correo"
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
			Summary = "Restablecer contrase�a",
			Description = "Permite que el usuario cambie su contrase�a si se le olvid�"
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
		   Summary = "Salir de sesi�n",
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
			Response.Cookies.Delete("userId", new CookieOptions
			{
				HttpOnly = true,
				Secure = true,
				Expires = DateTime.UtcNow.AddDays(5),
				SameSite = SameSiteMode.None
			});
			Response.Cookies.Delete("company", new CookieOptions
			{
				HttpOnly = true,
				Secure = true,
				Expires = DateTime.UtcNow.AddDays(5),
				SameSite = SameSiteMode.None
			});

			return NoContent();
		}
	}
}