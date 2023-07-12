using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Interfaces.Repositories;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MediSearch.Core.Application.Features.Product.Command.AddComment
{
    public class AddCommentCommand : IRequest<ProductResponse>
    {
        [SwaggerParameter(Description = "Comentario")]
        [Required(ErrorMessage = "Debe de especificar un contenido para este comentario.")]
        public string Content { get; set; }

        [SwaggerParameter(Description = "Producto")]
        [Required(ErrorMessage = "Debe de especificar el producto para este comentario.")]
        public string ProductId { get; set; }

        [JsonIgnore]
        public string? UserId { get; set; }
    }

    public class AddCommentCommandHandler : IRequestHandler<AddCommentCommand, ProductResponse>
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;

        public AddCommentCommandHandler(ICommentRepository commentRepository, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
        }


        public async Task<ProductResponse> Handle(AddCommentCommand command, CancellationToken cancellationToken)
        {
            ProductResponse response = new()
            {
                HasError = false
            };

            try
            {
                var valueToAdd = _mapper.Map<Domain.Entities.Comment>(command);
                await _commentRepository.AddAsync(valueToAdd);
                
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
