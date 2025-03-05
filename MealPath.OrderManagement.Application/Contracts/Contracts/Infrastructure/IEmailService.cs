using MealPath.OrderManagement.Application.Models.Mail;

namespace MealPath.OrderManagement.Application.Contracts.Infrastructure
{
    public interface IEmailService
    {
        Task<bool> SendEmail(Email email);

    }
}
