using MealPath.OrderManagement.Domain.Common;

namespace MealPath.OrderManagement.Domain.Entities
{
    public class OrderItems
    {
        public int OrderItemsID { get; set; }
        public int OrderID { get; set; }
        public int ProductID { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }

    }
}
