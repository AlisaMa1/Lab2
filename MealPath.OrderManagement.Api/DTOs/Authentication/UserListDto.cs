namespace MealPath.OrderManagement.Api.DTOs.Authentication
{
    public class UserListDto
    {
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public List<string> Roles{ get; set; } = new List<string>();
    }
}
