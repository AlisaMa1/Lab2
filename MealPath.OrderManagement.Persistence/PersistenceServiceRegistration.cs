using MealPath.OrderManagement.Application.Contracts.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MealPath.OrderManagement.Persistence.Repositories;

namespace MealPath.OrderManagement.Persistence
{
    public static class PersistenceServiceRegistration
    {
        public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<MealPathDbContext>(options =>
                {
                    options.UseSqlServer(configuration["ConnectionStrings:DefaultConnection"] ?? "");
                }
            );

            //services.AddDbContext<MealPathDbContext>(options =>
            //    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped(typeof(IAsyncRepository<>), typeof(BaseRepository<>));

            services.AddScoped<ICategoryRepository, CategoryRepository>();

            services.AddScoped<IProductRepository, ProductRepository>();

            return services;
        }
    }
}
