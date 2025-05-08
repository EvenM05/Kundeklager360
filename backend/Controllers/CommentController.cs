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
    [Authorize]

    public class CommentController : ControllerBase
    { 
        private readonly AppDbContext _appDbContext;
    
        public CommentController
        (
            AppDbContext appDbContext
        )
        {
            _appDbContext = appDbContext;
        }

        [HttpPost("CreateComment")]
        public async Task<IActionResult> PostComment(CreateCommentDto model)
        {
            if (ModelState.IsValid)
            {

                var comment = new Comment
                {
                    Id = model.id,
                    CommentString = model.CommentString,
                    UserId = model.UserId,
                    ComplaintId = model.ComplaintId,
                    CreateDate = DateTime.UtcNow
                };

                Console.WriteLine(comment.CommentString);
                Console.WriteLine(comment.CreateDate);

                await _appDbContext.Comments.AddAsync(comment);
                await _appDbContext.SaveChangesAsync();

                return Ok(comment);
            }
            return BadRequest(ModelState);
        }
        
        [HttpGet("GetAllComments")]
        public async Task<IActionResult> GetAllComments()
        {
            var comments = await _appDbContext.Comments.Select(c => new Comment
            {
                CommentString = c.CommentString,
                User = _appDbContext.Users.Select(u => new User {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,
                }).FirstOrDefault(u => u.Id == c.UserId)
            }).ToListAsync();
            
            return Ok(comments);
        }
    }
}