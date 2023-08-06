﻿using MediSearch.Core.Application.Dtos.Company;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Features.Home.Queries.GetAllCompanies;
using MediSearch.Core.Application.Features.Home.Queries.GetAllFarmacy;
using MediSearch.Core.Application.Features.Home.Queries.GetAllLaboratory;
using MediSearch.Core.Application.Features.Home.Queries.GetCompanyByName;
using MediSearch.Core.Application.Features.Home.Queries.GetCompanyDetails;
using MediSearch.Core.Application.Features.Home.Queries.GetProduct;
using MediSearch.Core.Application.Features.Home.Queries.GetProductsFarmacy;
using MediSearch.Core.Application.Features.Home.Queries.GetProductsLaboratory;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace MediSearch.WebApi.Controllers.v1
{
    [SwaggerTag("Inicio")]
    public class HomeController : BaseApiController
    {
        [HttpGet("get-products-farmacy")]
        [SwaggerOperation(
           Summary = "Obtener todos los productos de las farmacias.",
            Description = "Nos permite obtener todos los productos que las farmacias han registrado en el sistema."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ProductHomeDTO>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProductResponse))]
        public async Task<IActionResult> GetProductsFarmacy()
        {

            try
            {
                var result = await Mediator.Send(new GetProductsFarmacyQuery());

                if (result == null || result.Count == 0)
                    return NotFound();

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [HttpGet("get-products-laboratory")]
        [SwaggerOperation(
           Summary = "Obtener todos los productos de los laboratorios.",
            Description = "Nos permite obtener todos los productos que los laboratoios han registrado en el sistema."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ProductHomeDTO>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProductResponse))]
        public async Task<IActionResult> GetProductsLaboratory()
        {

            try
            {
                var result = await Mediator.Send(new GetProductsLaboratoryQuery());

                if (result == null || result.Count == 0)
                    return NotFound();

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [HttpGet("get-product/{id}")]
        [SwaggerOperation(
           Summary = "Obtener las informaciones de un producto.",
            Description = "Nos permite obtener todas las informaciones de un producto y de la empresa que lo registró."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetProductQueryResponse))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetProduct(string id)
        {
            try
            {

                var result = await Mediator.Send(new GetProductQuery() { Id = id });

                if (result == null)
                    return NotFound();

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [HttpGet("get-all-farmacy")]
        [SwaggerOperation(
           Summary = "Obtener todas las farmacias.",
            Description = "Nos permite obtener todas las farmacias en el sistema."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<CompanyDTO>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProductResponse))]
        public async Task<IActionResult> GetAllFarmacy()
        {

            try
            {
                var result = await Mediator.Send(new GetAllFarmacyQuery());

                if (result == null || result.Count == 0)
                    return NotFound();

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [HttpGet("get-all-laboratory")]
        [SwaggerOperation(
           Summary = "Obtener todas los laboratorios.",
            Description = "Nos permite obtener todas los laboratorios en el sistema."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<CompanyDTO>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProductResponse))]
        public async Task<IActionResult> GetAllLaboratory()
        {

            try
            {
                var result = await Mediator.Send(new GetAllLaboratoryQuery());

                if (result == null || result.Count == 0)
                    return NotFound();

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [HttpGet("get-all-companies")]
        [SwaggerOperation(
           Summary = "Obtener todas las empresas.",
            Description = "Nos permite obtener todos las empresas en el sistema."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<GetAllCompaniesQueryResponse>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllCompanies()
        {
            try
            {

                var result = await Mediator.Send(new GetAllCompaniesQuery());

                if (result == null || result.Count == 0)
                    return NotFound();

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [HttpGet("get-company/{id}")]
        [SwaggerOperation(
           Summary = "Obtener las informaciones de una empresa.",
            Description = "Nos permite obtener todos los campos de una empresa."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CompanyDetailsDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCompanyDetails(string id)
        {
            try
            {

                var result = await Mediator.Send(new GetCompanyDetailsQuery() { Id = id });

                if (result == null)
                    return NotFound();

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }

        [HttpGet("get-company-name")]
        [SwaggerOperation(
           Summary = "Obtener empresas por nombre.",
            Description = "Nos permite obtener todas las empresas que coincidan con la busqueda por nombre."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<GetCompanyByNameQueryResponse>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCompanyByName(GetCompanyByNameQuery query)
        {
            try
            {

                var result = await Mediator.Send(query);

                if (result == null || result.Count == 0)
                    return NotFound();

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }
    }
}
