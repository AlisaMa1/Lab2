namespace MealPath.OrderManagement.Application.Responses
{
    public class BaseResponse<T> where T : class
    {
        public BaseResponse()
        {
            Success = true;
        }
        public BaseResponse(string message)
        {
            Success = true;
            Message = message;
        }

        public BaseResponse(string message, bool success)
        {
            Success = success;
            Message = message;
        }

        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<string>? ValidationErrors { get; set; }
        
        public T? Value { get; set; }
    }
}
