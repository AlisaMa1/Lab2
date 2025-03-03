namespace MealPath.OrderManagement.Api.DTOs.Authentication
{
    public class UserDto
    {
        public string DisplayName { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}
