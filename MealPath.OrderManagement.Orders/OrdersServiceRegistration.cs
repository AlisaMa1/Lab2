using MealPath.OrderManagement.Application.Contracts.Orders;
using MealPath.OrderManagement.Orders.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MealPath.OrderManagement.Orders
{
    public static class OrdersServiceRegistration
    {
        public static IServiceCollection AddOrdersServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<PaymentService>();

            return services;
        }
    }
}
