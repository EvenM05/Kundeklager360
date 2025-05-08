using Kundeklager.Data;
using Kundeklager.Models;
using Kundeklager.Models.Dto;
using Kundeklager.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Kundeklager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class LoginController : ControllerBase
    { 
        private readonly AppDbContext _appDbContext;
    
        public LoginController
        (
            AppDbContext appDbContext
        )
        {
            _appDbContext = appDbContext;
        }
        
        private bool VerifyPassword(string password, string passwordHash, string salt)
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);
            return hashedPassword == passwordHash;
        }


        [HttpPost("LoginUser")]
        public async Task<IActionResult> LoginUser(LoginDto model)
        {
            var user = await _appDbContext.Users.Where(u => u.Email == model.Email).FirstOrDefaultAsync();

            if (user == null)
            {
                return BadRequest( new { Error = "No user uses the specified email"});
            }

            if (user == null || !VerifyPassword(model.Password, user.PasswordHash, user.Salt)) 
            {
                return Unauthorized(new {Error = "Unauthorized"});
            }

            var token = JwtTokenManager.GenerateJwtToken(model.Email);

            var returnData = new
            {
                token = token,
                userId = user.Id
            };

            return Ok(returnData);
        }
        
    }
}