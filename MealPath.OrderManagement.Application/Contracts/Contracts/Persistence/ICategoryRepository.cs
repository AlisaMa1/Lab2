using MealPath.OrderManagement.Domain.Entities;

namespace MealPath.OrderManagement.Application.Contracts.Persistence
{
    public interface ICategoryRepository: IAsyncRepository<Category>
    {
    }
}
