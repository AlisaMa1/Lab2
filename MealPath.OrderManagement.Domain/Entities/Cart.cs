using MealPath.OrderManagement.Domain.Common;

namespace MealPath.OrderManagement.Domain.Entities
{
    public class Cart : AuditableEntity
    {
        public int CartID { get; set; }
        public int UserID { get; set; }
        public int ProductID { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }



    }
}
