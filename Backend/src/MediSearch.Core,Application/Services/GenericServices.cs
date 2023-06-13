using AutoMapper;
using MediSearch.Core.Application.Interfaces.Repositories;
using MediSearch.Core.Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Services
{
    public class GenericServices<DtoRequest, DtoResponse, Entity> : IGenericServices<DtoRequest, DtoResponse> where DtoResponse : class
        where DtoRequest : class
        where Entity : class

    {
        private readonly IGenericRepository<Entity> _repository;
        private readonly IMapper _mapper;

        public GenericServices(IGenericRepository<Entity> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<DtoRequest> Add(DtoRequest request)
        {
            Entity entity = _mapper.Map<Entity>(request);

            entity = await _repository.AddAsync(entity);

            return _mapper.Map<DtoRequest>(entity);
        }

        public async Task Delete(string id)
        {
            Entity entity = await _repository.GetByIdAsync(id);

            await _repository.DeleteAsync(entity);
        }

        public async Task<List<DtoResponse>> GetAllResponse()
        {
            var response = await _repository.GetAllAsync();

            return _mapper.Map<List<DtoResponse>>(response);
        }

        public async Task<DtoRequest> GetByIdSaveRequest(string id)
        {
            Entity entity = await _repository.GetByIdAsync(id);

            return _mapper.Map<DtoRequest>(entity);
        }

        public async Task Update(DtoRequest request, string id)
        {
            var entity = _mapper.Map<Entity>(request);

            await _repository.UpdateAsync(entity, id);
        }

    }
}
