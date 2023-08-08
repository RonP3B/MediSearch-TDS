using MediatR;
using MediSearch.Core.Application.Interfaces.Repositories;

namespace MediSearch.Core.Application.Features.Admin.Queries.GetDataDashboard
{
    public class GetDataDashboardQuery : IRequest<GetDataDashboardQueryResponse>
    {
        public string CompanyId { get; set; }
    }

    public class GetDataDashboardQueryHandler : IRequestHandler<GetDataDashboardQuery, GetDataDashboardQueryResponse>
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly ICompanyUserRepository _companyUserRepository;
        private readonly IHallUserRepository _hallUserRepository;
        private readonly ICommentRepository _commentRepository;
        public GetDataDashboardQueryHandler(ICompanyRepository companyRepository, ICompanyUserRepository companyUserRepository, IHallUserRepository hallUserRepository, ICommentRepository commentRepository)
        {
            _companyRepository = companyRepository;
            _companyUserRepository = companyUserRepository;
            _hallUserRepository = hallUserRepository;
            _commentRepository = commentRepository;
        }

        public async Task<GetDataDashboardQueryResponse> Handle(GetDataDashboardQuery query, CancellationToken cancellationToken)
        {
            GetDataDashboardQueryResponse response = new();
            var companies = await _companyRepository.GetAllWithIncludeAsync(new List<string> () { "Products", "CompanyType"});
            var company = companies.Find(p => p.Id == query.CompanyId);
            var companyUser = await _companyUserRepository.GetAllAsync();
            var hallUser = await _hallUserRepository.GetAllAsync();

            List<MaxInteraction> maxes = new();
            if(company.Products.Count != 0)
            {
                foreach (var product in company.Products)
                {
                    MaxInteraction maxInteraction = new();
                    maxInteraction.Product = product.Name;
                    
                    var comments = await _commentRepository.GetCommentsByProduct(product.Id);
                    maxInteraction.Quantity = comments.Count;

                    foreach (var comment in comments)
                    {
                        maxInteraction.Quantity = maxInteraction.Quantity + comment.Replies.Count;
                    }

                    maxes.Add(maxInteraction);
                }
            }
            response.MyProducts = company.Products.Count;
            response.MyUsers = companyUser.Count(c => c.CompanyId == query.CompanyId);
            response.OpposingCompanies = companies.Count(c => c.CompanyTypeId != company.CompanyTypeId);
            response.MyChats = hallUser.Count(h => h.UserId == company.Id);
            response.ProvinceCompanies = companies.Where(c => c.CompanyTypeId != company.CompanyTypeId).GroupBy(c => c.Province).Select(c => new ProvinceCompany()
            {
                Province = c.Key,
                Quantity = c.Count()
            }).OrderByDescending(c => c.Quantity).Take(4).ToList();
            response.MaxProducts = company.Products.OrderByDescending(p => p.Quantity).Take(10).Select(p => new MaxProduct()
            {
                Product = p.Name,
                Quantity = p.Quantity
            }).ToList();
            response.MaxClassifications = company.Products.GroupBy(p => p.Classification).Select(p => new MaxClassification()
            {
                Classification = p.Key,
                Quantity = p.Count()
            }).OrderByDescending(p => p.Quantity).Take(8).ToList();
            response.MaxInteractions = maxes.OrderByDescending(m => m.Quantity).Take(5).ToList();

            return response;
        }
    }
}
