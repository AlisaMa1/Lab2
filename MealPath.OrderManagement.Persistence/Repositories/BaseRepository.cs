using System.Linq.Expressions;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using Microsoft.EntityFrameworkCore;

namespace MealPath.OrderManagement.Persistence.Repositories;

public class BaseRepository<T>: IAsyncRepository<T> where T : class
{
    protected readonly MealPathDbContext _dbContext;

    public BaseRepository(MealPathDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public virtual async Task<T?> GetByIdAsync(int id)
    {
        T? t = await _dbContext.Set<T>().FindAsync(id);
        return t;
    }

    public async Task<IReadOnlyList<T>> ListAllAsync()
    {
        return await _dbContext.Set<T>().ToListAsync();
    }

    //public async virtual Task<IReadOnlyList<T>> GetPagedReponseAsync(int page, int size)
    //{
    //    return await _dbContext.Set<T>().Skip((page - 1) * size).Take(size).AsNoTracking().ToListAsync();
    //}

    public async virtual Task<(int totalCount, IReadOnlyList<T> data)> GetPagedReponseAsync(int page, int size)
    {
        var totalCount = await _dbContext.Set<T>().CountAsync();
        var data = await _dbContext.Set<T>().Skip((page - 1) * size).Take(size).AsNoTracking().ToListAsync();

        return (totalCount, data);
    }
    public async Task<IReadOnlyList<T>> ListAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbContext.Set<T>().Where(predicate).ToListAsync();
    }
    public async Task<T> AddAsync(T entity)
    {
        await _dbContext.Set<T>().AddAsync(entity);
        await _dbContext.SaveChangesAsync();

        return entity;
    }

    public async Task UpdateAsync(T entity)
    {
        _dbContext.Entry(entity).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(T entity)
    {
        _dbContext.Set<T>().Remove(entity);
        await _dbContext.SaveChangesAsync();
    }
}