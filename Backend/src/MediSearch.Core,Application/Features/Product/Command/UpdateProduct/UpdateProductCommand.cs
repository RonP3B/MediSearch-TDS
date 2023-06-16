using MediatR;
using MediSearch.Core.Application.Dtos.Product;
using Microsoft.AspNetCore.Http;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace MediSearch.Core.Application.Features.Product.Command.UpdateProduct
{
    public record UpdateProductCommand : IRequest<ProductResponse>
    {
        [SwaggerParameter(Description = "El id del producto a actualizar")]
        [Required(ErrorMessage = "El id es requerido para actualizarlo")]
        public string Id { get; init; }

        [SwaggerParameter(Description = "Nombre que deseas destinar para el producto.")]
        [Required(ErrorMessage = "Debe de especificar un nombre para este producto.")]
        public string Name { get; init; }

        [SwaggerParameter(Description = "Descripción que deseas destinar para el producto.")]
        [Required(ErrorMessage = "Debe de especificar un nombre para este producto.")]
        public string Description { get; init; }

        [SwaggerParameter(Description = "Categorías (enfermedades) que trata, cura o alivia el producto.")]
        [Required(ErrorMessage = "Debe de especificar categorías para este producto.")]
        public List<string> Categories { get; init; }

        [SwaggerParameter(Description = "Componentes que tiene el producto.")]
        [Required(ErrorMessage = "Debe especificar los componentes de este producto.")]
        public List<string> Components { get; init; }

        [SwaggerParameter(Description = "Precio que deseas destinar para el producto.")]
        [Required(ErrorMessage = "Debe de especificar un precio para este producto.")]
        public double Price { get; init; }

        [SwaggerParameter(Description = "Cantidad disponible que tienes del producto.")]
        [Required(ErrorMessage = "Debe de especificar la cantidad del producto.")]
        public int Quantity { get; init; }

        [SwaggerParameter(Description = "Imágenes que deseas destinar para el producto.")]
        [MinLength(1, ErrorMessage = "Debe de subir al menos una imagén para este producto.")]
        public IFormFile[] Images { get; init; }

    }

}
