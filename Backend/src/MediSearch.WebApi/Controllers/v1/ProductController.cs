﻿using MediSearch.Core.Application.Dtos.Account;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Features.Account.Commands.RegisterClient;
using MediSearch.Core.Application.Features.Admin.Commands.DeleteEmployee;
using MediSearch.Core.Application.Features.Admin.Commands.RegisterEmployee;
using MediSearch.Core.Application.Features.Admin.Queries.GetUsersCompany;
using MediSearch.Core.Application.Features.Product.CreateProduct;
using MediSearch.WebApi.Middlewares;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Annotations;
using System.Net.Mime;

namespace MediSearch.WebApi.Controllers.v1
{
    [Authorize(Roles = "Administrator, Manager")]
    public class ProductController : BaseApiController
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        public ProductController(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
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
    }
}
