using MealPath.OrderManagement.Api;
using MealPath.OrderManagement.Identity.Models;
using MealPath.OrderManagement.Identity.Seed;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);


var app = builder
       .ConfigureServices()
       .ConfigurePipeline();


await app.ResetDatabaseAsync();

//var userManager = app.Services.GetRequiredService<UserManager<AppUser>>();
//await UserCreator.SeedAsync(userManager);

app.Run();