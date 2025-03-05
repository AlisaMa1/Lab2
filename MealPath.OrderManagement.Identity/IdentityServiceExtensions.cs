using MealPath.OrderManagement.Identity.Models;
using MealPath.OrderManagement.Identity.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
using System.Text;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using AspNetCore.Identity.MongoDbCore.Extensions;

namespace MealPath.OrderManagement.Identity
{
    public static class IdentityServiceExtensions
    {
        public static void AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
        {

            BsonSerializer.RegisterSerializer(new GuidSerializer(MongoDB.Bson.BsonType.String));
            BsonSerializer.RegisterSerializer(new DateTimeSerializer(MongoDB.Bson.BsonType.String));
            BsonSerializer.RegisterSerializer(new DateTimeOffsetSerializer(MongoDB.Bson.BsonType.String));

            var mongoDbIdentityConfig = new AspNetCore.Identity.MongoDbCore.Infrastructure.MongoDbIdentityConfiguration()
            {
                MongoDbSettings = new AspNetCore.Identity.MongoDbCore.Infrastructure.MongoDbSettings()
                {
                    ConnectionString = "mongodb://localhost:27017",
                    DatabaseName = "MealPathIdentityDb"
                },
                IdentityOptionsAction =  options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 8;
                    options.Password.RequireNonAlphanumeric = true;
                    options.Password.RequireLowercase = true;

                    //lockout
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
                    options.Lockout.MaxFailedAccessAttempts = 5;

                    options.User.RequireUniqueEmail = true;
                }
            };

            services.ConfigureMongoDbIdentity<AppUser, AppRole, Guid>(mongoDbIdentityConfig)
            .AddUserManager<UserManager<AppUser>>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddRoleManager<RoleManager<AppRole>>()
            .AddDefaultTokenProviders();


            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));

            //services.AddDbContext<MealPathIdentityDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("MealPathIdentityConnectionString"),
            //                                                        b => b.MigrationsAssembly(typeof(MealPathIdentityDbContext).Assembly.FullName)));

            //services.AddIdentity<AppUser, IdentityRole>()
            //    .AddEntityFrameworkStores<MealPathIdentityDbContext>()
            //    .AddSignInManager<SignInManager<AppUser>>()
            //    .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(o =>
                {
                    o.RequireHttpsMetadata = false;
                    o.SaveToken = false;
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidIssuer = configuration["JwtSettings:Issuer"],
                        ValidAudience = configuration["JwtSettings:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"] ?? ""))
                    };
                });

            services.AddScoped<TokenService>();

            //return services;
        }
    }
}
