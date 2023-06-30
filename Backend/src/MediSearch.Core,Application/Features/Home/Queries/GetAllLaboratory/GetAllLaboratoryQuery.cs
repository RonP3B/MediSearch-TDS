using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Dtos.Company;
using MediSearch.Core.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Home.Queries.GetAllLaboratory
{
    public class GetAllLaboratoryQuery : IRequest<List<CompanyDTO>>
    {

    }

    public class GetAllLaboratoryQueryHandler : IRequestHandler<GetAllLaboratoryQuery, List<CompanyDTO>>
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly ICompanyTypeRepository _companyTypeRepository;
        private readonly IMapper _mapper;

        public GetAllLaboratoryQueryHandler(ICompanyRepository companyRepository, ICompanyTypeRepository companyTypeRepository, IMapper mapper)
        {
            _companyRepository = companyRepository;
            _companyTypeRepository = companyTypeRepository;
            _mapper = mapper;
        }

        public async Task<List<CompanyDTO>> Handle(GetAllLaboratoryQuery request, CancellationToken cancellationToken)
        {
            List<CompanyDTO> laboratories = await GetLaboratories();

            return laboratories;
        }

        private async Task<List<CompanyDTO>> GetLaboratories()
        {
            var type = await _companyTypeRepository.GetByNameAsync("Laboratorio");
            var companies = await _companyRepository.GetAllAsync();
            var laboratories = companies.FindAll(x => x.CompanyTypeId == type.Id);
            var result = _mapper.Map<List<CompanyDTO>>(laboratories);

            return result;
        }
    }
}
