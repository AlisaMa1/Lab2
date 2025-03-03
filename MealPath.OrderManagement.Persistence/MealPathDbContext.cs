using MealPath.OrderManagement.Domain.Common;
using MealPath.OrderManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MealPath.OrderManagement.Persistence
{
    public class MealPathDbContext : DbContext
    {
        public MealPathDbContext(DbContextOptions<MealPathDbContext> options) : base(options)
        {
        }



        public DbSet<Product> Products { get; set; } = default!;

        
        

        public DbSet<Category> Categories { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MealPathDbContext).Assembly);

            modelBuilder.Entity<Category>().HasData(new Category
            {
                CategoryId = 1,
                Name = "Italian style"
            });

            modelBuilder.Entity<Category>().HasData(new Category
            {
                CategoryId = 2,
                Name = "New york style"
            });

            modelBuilder.Entity<Product>().HasData(new Product
            {
                ProductID = 1,
                Title = "Pizza Margherita",
                Description = "tomato sauce, fresh mozzarella cheese, basil leaves, and sometimes grated Parmesan cheese",
                CategoryId = 2,
                Price = 4.2,
                ImageUrl = "https://mealpathapp.blob.core.windows.net/mealpath/pizza5.png",
                Status = true

            });

            modelBuilder.Entity<Product>().HasData(new Product
            {
                ProductID = 2,
                Title = "Pizza Sicilian",
                Description = "onions, anchovies, tomatoes, herbs and strong cheese such as caciocavallo and toma.",
                CategoryId = 1,
                Price = 7.5,
                ImageUrl = "https://mealpathapp.blob.core.windows.net/mealpath/pizza9.png",
                Status = true

            });
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedDate = DateTime.Now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.LastModifiedDate = DateTime.Now;
                        break;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }}
}
