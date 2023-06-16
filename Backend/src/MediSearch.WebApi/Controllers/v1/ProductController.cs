using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Features.Account.Commands.RegisterClient;
using MediSearch.Core.Application.Features.Admin.Commands.DeleteEmployee;
using MediSearch.Core.Application.Features.Admin.Commands.RegisterEmployee;
using MediSearch.Core.Application.Features.Admin.Queries.GetUsersCompany;
using MediSearch.Core.Application.Features.Product.CreateProduct;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net.Mime;

namespace MediSearch.WebApi.Controllers.v1
{
    [Authorize(Roles = "Administrator, Manager")]
    public class ProductController : BaseApiController
    {
        [HttpPost("create")]
        [SwaggerOperation(
           Summary = "Registra un producto.",
            Description = "Al especificar las propiedades nos permite llevar acabo el registro de un producto."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProductResponseMessage))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProductResponseMessage))]
        public async Task<IActionResult> CreateProduct([FromForm] CreateProductCommand command)
        {

            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                var result = await Mediator.Send(command);

                if (result.HasError)
                    return StatusCode(StatusCodes.Status500InternalServerError, result);

                return Ok(result.IsSuccess);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }
    }
}
