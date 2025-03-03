using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;
using MealPath.OrderManagement.Persistence;
using Microsoft.EntityFrameworkCore;

namespace MealPath.OrderManagement.Persistence.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(MealPathDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IReadOnlyList<Category>> ListCategoriesByCreatedDateDescending()
        {
            var allCategories = await _dbContext.Categories.ToListAsync();
            return allCategories.OrderByDescending(e => e.CreatedDate).ToList();
        }
    }
}