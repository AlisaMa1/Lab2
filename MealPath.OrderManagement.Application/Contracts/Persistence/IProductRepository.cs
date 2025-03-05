using MealPath.OrderManagement.Domain.Entities;

namespace MealPath.OrderManagement.Application.Contracts.Persistence
{
    public interface IProductRepository: IAsyncRepository<Product>
    {
        Task<int> GetTotalProductCountAsync();
    }
}
