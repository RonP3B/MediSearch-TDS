using MediatR;
using MediSearch.Core.Application.Dtos.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Product.Command.DeleteProduct
{
    public record DeleteProductCommand(string Id) : IRequest<ProductResponseMessage>;
}
