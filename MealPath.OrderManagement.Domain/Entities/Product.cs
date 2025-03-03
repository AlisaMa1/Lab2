using MealPath.OrderManagement.Domain.Common;

namespace MealPath.OrderManagement.Domain.Entities
{
    public class Product : AuditableEntity
    {
        public int ProductID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }
        public bool Status { get; set; }
    }
}
