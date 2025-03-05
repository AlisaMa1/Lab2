using AutoMapper;
using MealPath.OrderManagement.Application.Features.Categories.Commands.CreateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoriesList;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoryDetails;
using MealPath.OrderManagement.Application.Features.Products.Commands.CreateProduct;
using MealPath.OrderManagement.Application.Features.Products.Commands.UpdateProduct;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductDetails;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductList1;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsByCategory;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsList;
using MealPath.OrderManagement.Domain.Entities;

namespace MealPath.OrderManagement.Application.Profiles
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<CategoryDetailsVm, Category>();
            CreateMap<Category, CreateCategoryDto>();
            CreateMap<Category, CategoryListVm>();
            CreateMap<Category, CategoryDetailsVm>();

            CreateMap<UpdateCategoryCommand, Category>();


            CreateMap<ProductDetailsVm, Product>();
            CreateMap<Product, CreateProductDto>();
            CreateMap<Product, ProductListVm>();
            CreateMap<Product, ProductDetailsVm>();
            CreateMap<Product, ProductListVmCat>();
            CreateMap<Product, ProductListVm1>();

            CreateMap<UpdateProductCommand, Product>();
        }
    }
}
