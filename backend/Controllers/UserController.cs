using Kundeklager.Data;
using Kundeklager.Models;
using Kundeklager.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Kundeklager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserController : ControllerBase
    { 
        private readonly AppDbContext _appDbContext;
    
        public UserController
        (
            AppDbContext appDbContext
        )
        {
            _appDbContext = appDbContext;
        }
        
        [HttpPost("CreateUser")]

        public IActionResult CreateUser([FromBody] UserDto model)
        {
            if (ModelState.IsValid) 
            {
                if (_appDbContext.Users.Any(u => u.Email == model.Email))
                {
                    return BadRequest(new { Error = "A user with this email already exists"});
                }

                var salt = BCrypt.Net.BCrypt.GenerateSalt();
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password, salt);

                var user = new User
                {
                    Name = model.Name,
                    Email = model.Email,
                    PasswordHash = hashedPassword,
                    Salt = salt,
                };

                _appDbContext.Users.AddAsync(user);
                _appDbContext.SaveChangesAsync();

                return Ok();
            }
            return BadRequest(ModelState);
        }

        [HttpGet("GetAllUsers")]
        [Authorize]

        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _appDbContext.Users.Select(u => new GetUserDto
            {
                Id = u.Id, 
                Name = u.Name,
                Email = u.Email
            }).ToListAsync();

            return Ok(users);
        }

        [HttpGet("GetUserById")]
        [Authorize]
        public async Task<IActionResult> GetUserById(Guid Id)
        {
            var user = await _appDbContext.Users.Where(u => u.Id == Id).Select(u => new GetUserDto
            {
                Id = u.Id, 
                Name = u.Name,
                Email = u.Email,

            }).FirstOrDefaultAsync();

            return Ok(user);
        }
    }
}