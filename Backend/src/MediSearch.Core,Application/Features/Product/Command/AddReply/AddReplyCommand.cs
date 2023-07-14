using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Interfaces.Repositories;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Product.Command.AddReply
{
    public class AddReplyCommand : IRequest<ProductResponse>
    {
        [SwaggerParameter(Description = "Respuesta")]
        [Required(ErrorMessage = "Debe de especificar un contenido para esta respuesta.")]
        public string Content { get; set; }

        [SwaggerParameter(Description = "Comentario")]
        [Required(ErrorMessage = "Debe de especificar el comentario para esta respuesta.")]
        public string CommentId { get; set; }

        [JsonIgnore]
        public string? UserId { get; set; }
    }

    public class AddReplyCommandHandler : IRequestHandler<AddReplyCommand, ProductResponse>
    {
        private readonly IReplyRepository _ReplyRepository;
        private readonly IMapper _mapper;

        public AddReplyCommandHandler(IReplyRepository ReplyRepository, IMapper mapper)
        {
            _ReplyRepository = ReplyRepository;
            _mapper = mapper;
        }


        public async Task<ProductResponse> Handle(AddReplyCommand command, CancellationToken cancellationToken)
        {
            ProductResponse response = new()
            {
                HasError = false
            };

            try
            {
                var valueToAdd = _mapper.Map<Domain.Entities.Reply>(command);
                await _ReplyRepository.AddAsync(valueToAdd);

                response.IsSuccess = true;
                return response;
            }
            catch (Exception ex)
            {
                response.HasError = true;
                response.Error = ex.Message;
                return response;
            }
        }
    }
}
