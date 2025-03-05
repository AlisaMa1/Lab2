using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace MealPath.OrderManagement.Identity.Models
{
    [CollectionName("roles")]
    public class AppRole: MongoIdentityRole<Guid>
    {
    }
}
