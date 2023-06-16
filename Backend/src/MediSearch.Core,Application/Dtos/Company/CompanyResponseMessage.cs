using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Dtos.Company
{
    public record CompanyResponseMessage(
     bool? HasError = false,
     string? Error = "",
     bool? IsSuccess= true
        );
}
