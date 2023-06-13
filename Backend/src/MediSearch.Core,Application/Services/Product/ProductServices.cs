using AutoMapper;
using MediSearch.Core.Application.Dtos.Product;
using MediSearch.Core.Application.Interfaces.Repositories;
using MediSearch.Core.Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Services.Product
{
    internal class ProductServices : GenericServices<ProductRequest, ProductResponse, Domain.Entities.Product>, IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductServices(IProductRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _productRepository = repository;
            _mapper = mapper;
        }
    }
}
