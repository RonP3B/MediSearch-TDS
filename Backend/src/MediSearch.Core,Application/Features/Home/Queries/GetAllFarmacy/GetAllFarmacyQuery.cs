using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Dtos.Company;
using MediSearch.Core.Application.Interfaces.Repositories;

namespace MediSearch.Core.Application.Features.Home.Queries.GetAllFarmacy
{
    public class GetAllFarmacyQuery : IRequest<List<CompanyDTO>>
    {

    }

    public class GetAllFarmacyQueryHandler : IRequestHandler<GetAllFarmacyQuery, List<CompanyDTO>>
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly ICompanyTypeRepository _companyTypeRepository;
        private readonly IMapper _mapper;

        public GetAllFarmacyQueryHandler(ICompanyRepository companyRepository, ICompanyTypeRepository companyTypeRepository, IMapper mapper)
        {
            _companyRepository = companyRepository;
            _companyTypeRepository = companyTypeRepository;
            _mapper = mapper;
        }

        public async Task<List<CompanyDTO>> Handle(GetAllFarmacyQuery request, CancellationToken cancellationToken)
        {
            List<CompanyDTO> farmacies = await GetFarmacies();

            return farmacies;
        }

        private async Task<List<CompanyDTO>> GetFarmacies()
        {
            var type = await _companyTypeRepository.GetByNameAsync("Farmacia");
            var companies = await _companyRepository.GetAllAsync();
            var farmacies = companies.FindAll(x => x.CompanyTypeId == type.Id);
            var result = _mapper.Map<List<CompanyDTO>>(farmacies);

            return result;
        }
    }
}
