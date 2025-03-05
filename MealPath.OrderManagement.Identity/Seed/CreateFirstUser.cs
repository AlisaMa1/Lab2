using MealPath.OrderManagement.Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace MealPath.OrderManagement.Identity.Seed
{
    public static class UserCreator
    {
        public static async Task SeedAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var applicationUser = new AppUser
                {
                    DisplayName = "Filan Fisteku",
                    UserName = "filan12",
                    Email = "filan@test.com",
                    EmailConfirmed = true
                };

                var user = await userManager.FindByEmailAsync(applicationUser.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(applicationUser, "Azerty&01?");
                }
            }
            

            
        }
    }
}