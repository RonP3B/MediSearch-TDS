using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Features.Chat.Queries.GetChats;
using MediSearch.WebApi.Middlewares;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace MediSearch.WebApi.Controllers.v1
{
    [Authorize]
    [SwaggerTag("Mensajería")]
    public class ChatController : BaseApiController
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        public ChatController(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        [HttpGet("get-all-chats")]
        [SwaggerOperation(
            Summary = "Todos los chats que tiene el usuario.",
            Description = "Permite obtener todos los chats que tiene el usuario con otros usuarios."
        )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<GetChatsQueryResponse>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllChats()
        {
            try
            {
                List<GetChatsQueryResponse> result = new();
                UserDataAccess userData = new(_serviceScopeFactory);
                var user = await userData.GetUserSession();

                if (user.CompanyId == "Client")
                {
                    result = await Mediator.Send(new GetChatsQuery() { IdUser = user.Id });
                }
                else
                {
                    result = await Mediator.Send(new GetChatsQuery() { IdUser = user.CompanyId });
                }

                if (result == null || result.Count == 0)
                    return NotFound("Este usuario no ha iniciado chat");

                return Ok(result);

            }
            catch (Exception e)
            {
                return new JsonResult(e.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }

        }
    }
}
