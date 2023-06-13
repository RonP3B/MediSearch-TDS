namespace MediSearch.Core.Application.Interfaces.Services
{
    public interface IGenericServices<DtoRequest, DtoResponse>
        where DtoRequest : class
        where DtoResponse : class
    {
        Task<DtoRequest> Add(DtoRequest request);
        Task Delete(string id);
        Task<List<DtoResponse>> GetAllResponse();
        Task<DtoRequest> GetByIdSaveRequest(string id);
        Task Update(DtoRequest request, string id);
    }
}