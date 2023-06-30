using MediSearch.Core.Application.Dtos.Company;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Features.Home.Queries.GetAllFarmacy;
using MediSearch.Core.Application.Features.Home.Queries.GetAllLaboratory;
using MediSearch.Core.Application.Features.Home.Queries.GetCompanyDetails;
using MediSearch.Core.Application.Features.Product.Queries.GetProductById;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace MediSearch.WebApi.Controllers.v1
{
    [SwaggerTag("Inicio")]
    public class HomeController : BaseApiController
    {
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
    }
}
