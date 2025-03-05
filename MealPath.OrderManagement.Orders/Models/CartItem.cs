namespace MealPath.OrderManagement.Orders.Models
{
    public class CartItem
    {
        public int ProductID { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
}
