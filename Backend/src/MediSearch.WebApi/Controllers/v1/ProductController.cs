﻿using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Features.Product.Command.DeleteProduct;
using MediSearch.Core.Application.Features.Product.Command.UpdateProduct;
using MediSearch.Core.Application.Features.Product.CreateProduct;
using MediSearch.Core.Application.Features.Product.Queries.GetAllProduct;
using MediSearch.Core.Application.Features.Product.Queries.GetProductById;
using MediSearch.WebApi.Middlewares;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net.Mime;

namespace MediSearch.WebApi.Controllers.v1
{
    [Authorize(Roles = "Administrator, Manager")]
    [SwaggerTag("Mantenimiento de Productos")]
    public class ProductController : BaseApiController
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        public ProductController(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        [HttpGet("get-aLL")]
        [SwaggerOperation(
           Summary = "Obtener todos los productos de la empresa.",
            Description = "Nos permite obtener todos los productos de la empresa."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProductResponse))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProductResponse))]
        public async Task<IActionResult> GetAllProduct()
        {

            try
            {
                UserDataAccess userData = new(_serviceScopeFactory);
                var user = await userData.GetUserSession();

                var result = await Mediator.Send(new GetAllProductQuery() { CompanyId = user.CompanyId});

                if (result == null || result.Count == 0)
                    return NotFound();

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [HttpGet("get/{id}")]
        [SwaggerOperation(
           Summary = "Obtener todos los productos de la empresa.",
            Description = "Nos permite obtener todos los productos de la empresa."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProductResponse))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProductResponse))]
        public async Task<IActionResult> GetProductById(string id)
        {
            try
            {

                var result = await Mediator.Send(new GetProductByIdQuery() { Id = id });

                if (result == null)
                    return NotFound();

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [HttpPost("create")]
        [SwaggerOperation(
           Summary = "Registra un producto.",
            Description = "Al especificar las propiedades nos permite llevar acabo el registro de un producto."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProductResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProductResponse))]
        public async Task<IActionResult> CreateProduct([FromForm] CreateProductCommand command)
        {

            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                UserDataAccess userData = new(_serviceScopeFactory);
                var user = await userData.GetUserSession();
                command.CompanyId = user.CompanyId;
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

        [HttpPut("update")]
        [SwaggerOperation(
            Summary = "Actualiza un producto.",
            Description = "Permite actualizar los valores de un producto específico."
            )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProductResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProductResponse))]
        public async Task<IActionResult> UpdateProduct([FromForm] UpdateProductCommand command)
        {

            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                UserDataAccess userData = new(_serviceScopeFactory);
                var user = await userData.GetUserSession();
                command.CompanyId = user.CompanyId;
                var result = await Mediator.Send(command);

                if (result.HasError)
                {
                    if (result.Error == "Producto no encontrado")
                    {
                        return NotFound();
                    }

                    return StatusCode(StatusCodes.Status500InternalServerError, result);
                }

                return Ok(result.IsSuccess);
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [HttpDelete("delete/{id}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [SwaggerOperation(
            Summary = "Permite eliminar un producto.",
            Description = "Maneja el apartado de eliminación, debe de especificar los parametros correspondientes."
        )]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            try
            {
                UserDataAccess userData = new(_serviceScopeFactory);
                var user = await userData.GetUserSession();
                var result = await Mediator.Send(new DeleteProductCommand() { Id = id, CompanyId = user.CompanyId});

                if (result.HasError)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, result.Error != null ? result.Error : "");
                }

                return NoContent();
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }
    }
}
