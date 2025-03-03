using MealPath.OrderManagement.Api.DTOs.Authentication;
using MealPath.OrderManagement.Identity.Models;
using MealPath.OrderManagement.Identity.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly RoleManager<AppRole> _roleManager;

        public AccountController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager, 
            TokenService tokenService,
            RoleManager<AppRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _roleManager = roleManager;
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("roles/add")]
        public async Task<IActionResult> CreateRole(CreateRoleDto request)
        {
            var appRole = new AppRole { Name = request.RoleName };
            await _roleManager.CreateAsync(appRole);

            return Ok(new { message = "role created succesfully" });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                await SetRefreshToken(user);

                return await CreateUserObject(user);
            }
            
            return Unauthorized();
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await _userManager.FindByNameAsync(registerDto.UserName) != null) 
            {
                ModelState.AddModelError("Username", "Username is taken");
                return ValidationProblem();
            }

            if (await _userManager.FindByEmailAsync(registerDto.Email) != null)
            {
                ModelState.AddModelError("Email", "Email is taken");
                return ValidationProblem();
            }


            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                EmailConfirmed = true
            };


            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                //_signInManager.SignInAsync(user, request.Password);
                await SetRefreshToken(user);
                //add user to role
                var addUserToRoleResult = await _userManager.AddToRoleAsync(user, "USER");

                if(!addUserToRoleResult.Succeeded)
                {
                    return BadRequest("A problem occurred while asigning a role to the user");
                }

                return await CreateUserObject(user);

            }

            return BadRequest("A problem occurred while registering the user!");
        }

        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            var user = _userManager.Users
                .Include(r => r.RefreshTokens)
                .FirstOrDefault(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));
                //.FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

            if (user == null) return Unauthorized();

            var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

            if(oldToken != null && !oldToken.IsActive)
            {
                return Unauthorized();
            }

            //if (oldToken != null) oldToken.Revoked = DateTime.UtcNow;

            return await CreateUserObject(user);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            await SetRefreshToken(user);
            return await CreateUserObject(user);
        }

        private async Task SetRefreshToken(AppUser user)
        {

            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshTokens.Add(refreshToken);

            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7),
            };

            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }

        [HttpGet("getUserRoles")]
        public async Task<ActionResult<List<UserRolesDto>>> GetUserRoles(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"User with ID {userId} not found");
            }

            var response = new List<UserRolesDto>();

            foreach (var role in _roleManager.Roles)
            {
                var userRole = new UserRolesDto
                {
                    RoleId = role.Id.ToString(),
                    RoleName = role.Name
                };

                if (await _userManager.IsInRoleAsync(user, role.Name))
                {
                    userRole.IsSelected = true;
                }
                else
                {
                    userRole.IsSelected = false;
                }

                response.Add(userRole);
            }

            return response;
        }

        [HttpPost("manageUserRoles")]
        public async Task<ActionResult> ManageUserRoles(List<UserRolesDto> model, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"User with ID {userId} not found");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var result = await _userManager.RemoveFromRolesAsync(user, roles);

            if (!result.Succeeded)
            {
                return BadRequest("Failed to remove user from roles!");
            }

            result = await _userManager.AddToRolesAsync(user, model.Where(x => x.IsSelected).Select(y => y.RoleName));

            if (!result.Succeeded)
            {
                return BadRequest("Failed to add user to roles!");
            }

            return Ok("Role changed successfully!");
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("addUserToRole")]
        public async Task<IActionResult> AddUserToRole(AddUserToRoleDto dto)
        {
            // Find the user by user ID
            var user = await _userManager.FindByIdAsync(dto.UserId);
            if (user == null)
            {
                return NotFound($"User with ID {dto.UserId} not found");
            }

            // Check if the role exists
            if (!await _roleManager.RoleExistsAsync(dto.RoleName))
            {
                return NotFound($"Role {dto.RoleName} not found");
            }

            // Check if the user is already in the role
            if (await _userManager.IsInRoleAsync(user, dto.RoleName))
            {
                return BadRequest($"User {user.UserName} is already in the role {dto.RoleName}");
            }

            // Add the user to the role
            var result = await _userManager.AddToRoleAsync(user, dto.RoleName);
            if (result.Succeeded)
            {
                return Ok($"User {user.UserName} added to role {dto.RoleName} successfully");
            }
            else
            {
                return BadRequest($"Error adding user to role: {string.Join(", ", result.Errors)}");
            }
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = _userManager.Users.ToList();

            var usersDto = users.Select(async user => new UserListDto
            {
                UserId = user.Id.ToString(),
                UserName = user.UserName,
                Email = user.Email,
                Roles = (await _userManager.GetRolesAsync(user)).ToList()
            }).ToList();

            return Ok(usersDto);
        }

        private async Task<UserDto> CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = "",
                Token = await _tokenService.CreateTokem(user),
                UserName = user.UserName
            };
        }
    }
}
