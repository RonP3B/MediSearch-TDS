using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Helpers;
using MediSearch.Core.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MediSearch.Core.Application.Features.Product.Command.UpdateProduct
{
    internal class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, ProductResponse>
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public UpdateProductCommandHandler(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<ProductResponse> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var valueToAdd = _mapper.Map<Domain.Entities.Product>(request);
                valueToAdd = await _productRepository.AddAsync(valueToAdd);

                if (request.Images.Length> 0)
                    valueToAdd.UrlImages = await ImageUpload.UploadImagesProduct(request.Images, valueToAdd.Id);

                return new ProductResponse()
                {
                    IsSuccess = true
                };
            }
            catch (Exception ex)
            {
                return new ProductResponse()
                {
                    Error = ex.Message,
                    HasError = true
                };
            }
        }
    }
}
