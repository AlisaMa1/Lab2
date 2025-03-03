using MealPath.OrderManagement.Domain.Common;

namespace MealPath.OrderManagement.Domain.Entities
{
    public class Category: AuditableEntity
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
    }
}
