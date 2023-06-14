﻿using MediatR;
using MediSearch.Core.Application.Helpers;
using MediSearch.Core.Application.Interfaces.Services;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Admin.Commands.DeleteEmployee
{
    public class DeleteEmployeeCommand : IRequest<int>
    {
        [SwaggerParameter(Description = "Identificador de empleado")]
        [Required(ErrorMessage = "Debe de ingresar el identiicador del empleado")]
        public string Id { get; set; }
    }

    public class DeleteEmployeeCommandHandler : IRequestHandler<DeleteEmployeeCommand, int>
    {
        private readonly IAccountService _accountService;
        public DeleteEmployeeCommandHandler(IAccountService accountService)
        {
            _accountService = accountService;
        }

        public async Task<int> Handle(DeleteEmployeeCommand command, CancellationToken cancellationToken)
        {
            var result = await _accountService.ValidateEmployee(command.Id);

            if (result == null)
                return 0;

            try
            {
                await _accountService.DeleteUserAsync(result.Id);
            }
            catch (Exception ex)
            {
                return 0;
            }

            ImageUpload.DeleteFile(result.UrlImage);
            return 1;
        }

    }
}
