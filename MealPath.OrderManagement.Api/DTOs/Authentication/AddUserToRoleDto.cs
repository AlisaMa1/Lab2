namespace MealPath.OrderManagement.Api.DTOs.Authentication
{
    public class AddUserToRoleDto
    {
        public string UserId { get; set; } = string.Empty;
        public string RoleName { get; set; } = string.Empty;
    }
}
