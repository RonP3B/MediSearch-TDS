using MediSearch.Core.Domain.Settings;
using MediSearch.Core_Application.Dtos.Email;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core_Application.Interfaces.Services
{
	public interface IEmailService
	{
		public MailSettings _mailSettings { get; }
		Task SendAsync(EmailRequest request);
	}
}
