using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Features.Admin.Commands.DeleteEmployee;
using MediSearch.Core.Application.Features.Admin.Commands.RegisterEmployee;
using MediSearch.Core.Application.Features.Admin.Queries.GetUsersCompany;
using MediSearch.WebApi.Middlewares;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net.Mime;

namespace MediSearch.WebApi.Controllers.v1
{
    [SwaggerTag("Administración de empresa")]
    public class AdminController : BaseApiController
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        public AdminController(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        [Authorize(Roles = "SuperAdmin, Admin")]
        [HttpGet("GetAllEmployees")]
        [SwaggerOperation(
            Summary = "Todos los empleados de la empresa.",
            Description = "Permite obtener todos los empleados que tiene la empresa registrados en el sistema."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<UserDTO>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllEmployees()
        {
            try
            {
                UserDataAccess userData = new(_serviceScopeFactory);
                var user = await userData.GetUserSession();
                var result = await Mediator.Send(new GetUsersCompanyQuery() { CompanyId = user.CompanyId });

                if (result == null)
                    return NotFound("Esta empresa no tiene empleados registrados");

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [Authorize(Roles = "SuperAdmin")]
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
            try
            {
                UserDataAccess userData = new(_serviceScopeFactory);
                var user = await userData.GetUserSession();
                command.CompanyId = user.CompanyId;
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
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }
        }

        [Authorize(Roles = "SuperAdmin")]
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
                UserDataAccess userData = new(_serviceScopeFactory);
                var user = await userData.GetUserSession();
                var result = await Mediator.Send(new DeleteEmployeeCommand() { Id = id, CompanyId = user.CompanyId });

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
