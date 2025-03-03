using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MealPath.OrderManagement.Persistence.Repositories
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(MealPathDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<int> GetTotalProductCountAsync()
        {
            return await _dbContext.Products.CountAsync();
        }

        public new async Task<IReadOnlyList<Product>> ListAsync(Expression<Func<Product, bool>> predicate)
        {
            return await _dbContext.Products.Where(predicate).ToListAsync();
        }

        public async Task<IReadOnlyList<Product>> ListProductsByCreatedDateDescending()
        {
            var allProducts = await _dbContext.Products.ToListAsync();
            return allProducts.OrderByDescending(e => e.CreatedDate).ToList();
        }

    }
}
