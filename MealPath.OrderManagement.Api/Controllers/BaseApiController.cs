using Microsoft.AspNetCore.Mvc;
using MealPath.OrderManagement.Application.Responses;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        protected ActionResult HandleResponse<T>(BaseResponse<T> response) where T : class 
        {
            if (response.Success && response.Value != null || response.Value == null)
            {
                return Ok(response);
            }
            if (!response.Success && response.Value == null && response.ValidationErrors == null)
            {
                return NotFound();
            }
            return BadRequest(response.Message);
        }
    }
}
