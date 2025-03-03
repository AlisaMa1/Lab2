using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Application.Features.Categories.Commands.CreateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoriesList;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoryDetails;
using MealPath.OrderManagement.Application.Features.Products.Commands.CreateProduct;
using MealPath.OrderManagement.Application.Features.Products.Commands.DeleteProduct;
using MealPath.OrderManagement.Application.Features.Products.Commands.UpdateProduct;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductDetails;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductList1;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsByCategory;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsList;

using MealPath.OrderManagement.Persistence.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IProductRepository _productRepository;

        public ProductsController(IMediator mediator, IProductRepository productRepository)
        {
            _mediator = mediator;
            _productRepository = productRepository;
        }

        //[HttpGet("all", Name = "GetAllProducts")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[AllowAnonymous]
        //public async Task<ActionResult<List<ProductListVm>>> GetAllProducts(int page = 1, int pageSize = 10)
        //{
        //    var query = new GetProductsListQuery { Page = page, PageSize = pageSize };
        //    var dtos = await _mediator.Send(query);
        //    return Ok(dtos);
        //}

        [HttpGet("allProducts", Name = "GetAllProductss")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ProductListVm1>>> GetAllProducts1()
        {
            var dtos = await _mediator.Send(new GetProductListQuery1());
            return Ok(dtos);
        }

        [HttpGet("all", Name = "GetAllProducts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [AllowAnonymous]
        public async Task<ActionResult<List<ProductListVm>>> GetAllProducts(int? page = null, int? pageSize = null)
        {
            if (page.HasValue && pageSize.HasValue)
            {
                var totalCount = await _productRepository.GetTotalProductCountAsync();

                var query = new GetProductsListQuery { Page = page.Value, PageSize = pageSize.Value };
                var dtos = await _mediator.Send(query);

                Response.Headers.Add("x-total-count", totalCount.ToString());

                return Ok(dtos);
            }
            else
            {
                // If page and pageSize are not provided, return all products
                var query = new GetProductsListQuery();
                var dtos = await _mediator.Send(query);

                return Ok(dtos);
            }
        }


        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetProductById")]
        public async Task<ActionResult<GetProductDetailsQueryResponse>> GetProductById(int id)
        {
            var response = await _mediator.Send(new GetProductDetailsQuery() { ProductID = id });
            return Ok(response);
        }

        [Authorize(Roles ="SuperAdmin, Admin")]
        [HttpPut(Name = "UpdateProduct")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<UpdateProductCommand>> Update([FromBody] UpdateProductCommand updateProductCommand)
        {
            var response = await _mediator.Send(updateProductCommand);
            return Ok(response);
        }

        [HttpPost(Name = "AddProduct")]
        public async Task<ActionResult<CreateProductCommandResponse>> Create([FromBody] CreateProductCommand createProductCommand)
        {
            var response = await _mediator.Send(createProductCommand);
            return Ok(response);
        }

        [Authorize(Roles ="SuperAdmin, Admin")]
        [HttpDelete("{id}", Name = "DeleteProduct")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<DeleteProductCommandResponse>> Delete(int id)
        {
            var response = await _mediator.Send(new DeleteProductCommand { ProductId = id });

            if (!response.Success)
            {
                return NotFound();
            }

            return NoContent();
        }


        [HttpGet("byCategory/{categoryId}", Name = "GetProductsByCategory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [AllowAnonymous]
        public async Task<ActionResult<List<ProductListVm>>> GetProductsByCategory(int categoryId)
        {
            var dtos = await _mediator.Send(new GetProductsByCategoryQuery { CategoryId = categoryId });
            return Ok(dtos);
        }


    }
}
