using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Dtos.Company
{
    public record CompanyResponse(
        string Ceo,
        string Name,
        string UrlImage,
        string Province,
        string Municipality,
        string Address,
        string Email,
        string Phone,
        string? Website,
        string? Facebook,
        string? Instagram,
        string? Twitter,
        string CompanyTypeId,
        int ProductCount = 0,
        int CompanyUserCount = 0
        );
}
