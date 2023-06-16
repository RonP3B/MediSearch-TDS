using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Features.Account.Commands.RegisterClient;
using MediSearch.Core.Application.Features.Admin.Commands.DeleteEmployee;
using MediSearch.Core.Application.Features.Admin.Commands.RegisterEmployee;
using MediSearch.Core.Application.Features.Admin.Queries.GetUsersCompany;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net.Mime;

namespace MediSearch.WebApi.Controllers.v1
{
    [Authorize(Roles = "Administrator")]
    public class AdminController : BaseApiController
    {
        [HttpGet("GetAllEmployees")]
        [SwaggerOperation(
            Summary = "Todos los empleados de la empresa.",
            Description = "Permite obtener todos los empleados que tiene la empresa registrados en el sistema."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllEmployees()
        {
            //Este controlador no trabajara hasta que se hagan las respectivas configuraciones en Automapper de las que depende ImmovableAssetType.ImmovableAsset.IdUser
            //Y las demas properties....
            try
            {
                var result = await Mediator.Send(new GetUsersCompanyQuery());

                if (result == null)
                    return NotFound("Esta empresa no tiene empleados registrados");

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [HttpPost("register-employee")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RegisterResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(RegisterResponse))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(RegisterResponse))]
        [SwaggerOperation(
           Summary = "Registro de empleados",
           Description = "Registra un empleado a tu empresa"
        )]
        public async Task<IActionResult> RegisterEmployee([FromBody] RegisterEmployeeCommand command)
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

        [HttpDelete("delete-employee/{id}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [SwaggerOperation(
            Summary = "Permite eliminar un empleado.",
            Description = "Maneja el apartado de eliminación, debe de especificar los parametros correspondientes."
        )]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            try
            {
                var result = await Mediator.Send(new DeleteEmployeeCommand() { Id = id });

                if (result == 0)
                    return StatusCode(StatusCodes.Status500InternalServerError);

                return NoContent();

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }
    }
}
