using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MealPath.OrderManagement.Persistence.Migrations
{
    public partial class addProducts1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "ProductID",
                keyValue: 1,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Title" },
                values: new object[] { 2, "tomato sauce, fresh mozzarella cheese, basil leaves, and sometimes grated Parmesan cheese", "https://mealpathapp.blob.core.windows.net/mealpath/pizza5.png", "Pizza Margherita" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductID", "CategoryId", "CreatedBy", "CreatedDate", "Description", "ImageUrl", "LastModifiedBy", "LastModifiedDate", "Price", "Status", "Title" },
                values: new object[] { 2, 1, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "onions, anchovies, tomatoes, herbs and strong cheese such as caciocavallo and toma.", "https://mealpathapp.blob.core.windows.net/mealpath/pizza9.png", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 7.5, true, "Pizza Sicilian" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductID",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "ProductID",
                keyValue: 1,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Title" },
                values: new object[] { 1, "this is a desc", "https://w7.pngwing.com/pngs/448/578/png-transparent-pizza-margherita-italian-cuisine-chicago-style-pizza-pepperoni-pizza-thumbnail.png", "Pizza Margarita" });
        }
    }
}
