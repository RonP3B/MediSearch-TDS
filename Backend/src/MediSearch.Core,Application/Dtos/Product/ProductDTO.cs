﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Dtos.Product
{
    public record ProductDTO(
         string Name,
         string Description,
         List<string> Categories,
         List<string> Components,
         double Price,
         int Quantity,
         List<string> UrlImages,
         string CompanyId
        );
}