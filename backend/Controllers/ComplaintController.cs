using Kundeklager.Data;
using Kundeklager.Models;
using Kundeklager.Models.Dto;
using Kundeklager.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Runtime.InteropServices;

namespace Kundeklager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ComplaintController : ControllerBase
    { 
        private readonly AppDbContext _appDbContext;
    
        public ComplaintController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost("CreateComplaint")]
        public async Task<IActionResult> PostComplaint(CreateComplaintDto model)
        {
            if (ModelState.IsValid)
            {
                var complaint = new Complaint
                {
                    Customer = model.Customer,
                    Description = model.Description,
                    Priority = model.Priority,      
                    Status = model.Status,
                    ComplaintVariant = model.ComplaintVariant,
                    CreateDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow,
                    CreatedUserId = model.CreatedUserId,
                    UpdatedUserId = model.UpdatedUserId
                };

                await _appDbContext.Complaints.AddAsync(complaint);
                await _appDbContext.SaveChangesAsync();

                return Ok(complaint);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("UpdateComplaint")]
        public async Task<IActionResult> UpdateComplaint(Guid id, UpdateComplaintDto model)
        {
            if (ModelState.IsValid)
            {
                var complaint = await _appDbContext.Complaints.FindAsync(id);

                if (complaint == null)
                {
                    return NotFound();
                }

                if (!string.IsNullOrEmpty(model.Customer))
                {
                    complaint.Customer = model.Customer;
                }

                if (!string.IsNullOrEmpty(model.Description))
                {
                    complaint.Description = model.Description;
                }

                if (model.Status != null)
                { 
                    complaint.Status = model.Status;
                }

                if (model.ComplaintVariant != null)
                {
                    complaint.ComplaintVariant = model.ComplaintVariant;
                }

                if (model.Priority != null)
                {
                    complaint.Priority = model.Priority;
                }
                complaint.UpdatedUserId = model.UpdatedUserId;
                complaint.UpdatedDate = DateTime.UtcNow;
                await _appDbContext.SaveChangesAsync();

                return Ok(complaint);
            }
            return BadRequest(ModelState);
        }

        [HttpGet("GetAllComplaints")]
        public async Task<IActionResult> GetAllComplaints()
        {
            var complaints = await _appDbContext.Complaints
                .Select(c => new ComplaintPaginationDto
                {
                    Id = c.Id,
                    Customer = c.Customer,
                    Description = c.Description,
                    Priority = c.Priority,
                    Status = c.Status,
                    CreateDate = c.CreateDate,
                    ComplaintVariant = c.ComplaintVariant,

                    UpdatedDate = c.UpdatedDate,
                    CreatedUserId = c.CreatedUserId,
                    UpdatedUserId = c.UpdatedUserId,
                    CreatedUser = _appDbContext.Users
                        .Where(u => u.Id == c.CreatedUserId)
                        .Select(u => new ComplaintPaginationUserDto
                        {
                            Id = u.Id,
                            Name = u.Name,
                            Email = u.Email
                        })
                        .FirstOrDefault(),
                    UpdatedUser = _appDbContext.Users
                        .Where(u => u.Id == c.UpdatedUserId)
                        .Select(u => new ComplaintPaginationUserDto
                        {
                            Id = u.Id,
                            Name = u.Name,
                            Email = u.Email
                        })
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(complaints);
        }

        [HttpGet("GetComplaintPagination")]
        public async Task<IActionResult> GetComplaintPagination(
            [FromQuery] string searchValue = "", 
            int page = 1, 
            int pageSize = 10, 
            string sortOrder = "desc", 
            int statusFilter = 0, 
            int priorityFilter = 0,
            int variantFilter = 0)
        {
            IQueryable<Complaint> query = _appDbContext.Complaints
                .Where(c => c.Customer.ToLower().Contains(searchValue.ToLower()));

            if (statusFilter != 0)
            {
                query = query.Where(c => c.Status == (StatusProcess)statusFilter);
            }
            
            if (priorityFilter != 0)
            {
                query = query.Where(c => c.Priority == (PriorityLevel)priorityFilter);
            }

            if (variantFilter != 0)
            {
                query = query.Where(c => c.ComplaintVariant == (ComplaintVariant)variantFilter);
            }

            if (sortOrder == "asc")
            {
                query = query.OrderBy(c => c.CreateDate);
            }
            else if (sortOrder == "desc")
            {
                query = query.OrderByDescending(c => c.CreateDate);
            }
            else
            {
                return BadRequest("Invalid sortOrder parameter. Use 'asc' or 'desc'.");
            }

            var totalComplaints = await query.CountAsync();

            var complaints = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new ComplaintPaginationDto
                {
                    Id = c.Id,
                    Customer = c.Customer,
                    Description = c.Description,
                    Priority = c.Priority,
                    Status = c.Status,
                    ComplaintVariant = c.ComplaintVariant,
                    CreateDate = c.CreateDate,
                    UpdatedDate = c.UpdatedDate,
                    CreatedUserId = c.CreatedUserId,
                    UpdatedUserId = c.UpdatedUserId,
                    CreatedUser = _appDbContext.Users
                        .Where(u => u.Id == c.CreatedUserId)
                        .Select(u => new ComplaintPaginationUserDto
                        {
                            Id = u.Id,
                            Name = u.Name,
                            Email = u.Email
                        })
                        .FirstOrDefault(),
                    UpdatedUser = _appDbContext.Users
                        .Where(u => u.Id == c.UpdatedUserId)
                        .Select(u => new ComplaintPaginationUserDto
                        {
                            Id = u.Id,
                            Name = u.Name,
                            Email = u.Email
                        })
                        .FirstOrDefault(),
                    Comments = _appDbContext.Comments
                        .Where(cm => cm.ComplaintId == c.Id)
                        .Select(cm => new ComplaintPaginationCommentDto
                        {
                            CommentString = cm.CommentString,
                            User = _appDbContext.Users
                                .Where(u => u.Id == cm.UserId)
                                .Select(u => new ComplaintPaginationUserDto
                                {
                                    Id = u.Id,
                                    Name = u.Name,
                                    Email = u.Email
                                })
                                .FirstOrDefault()
                        })
                        .ToList()
                })
                .ToListAsync();

            var result = new
            {
                totalComplaints,
                complaints
            };

            return Ok(result);
        }

        [HttpGet("GetComplaintById")]
        public async Task<IActionResult> GetComplaintById(Guid id)
        {
            var complaint = await _appDbContext.Complaints
                .Where(c => c.Id == id)
                .Select(c => new ComplaintPaginationDto
                {
                    Id = c.Id,
                    Customer = c.Customer,
                    Description = c.Description,
                    Priority = c.Priority,
                    Status = c.Status,
                    ComplaintVariant = c.ComplaintVariant,
                    CreateDate = c.CreateDate,
                    UpdatedDate = c.UpdatedDate,
                    CreatedUserId = c.CreatedUserId,
                    UpdatedUserId = c.UpdatedUserId,
                    CreatedUser = _appDbContext.Users
                        .Where(u => u.Id == c.CreatedUserId)
                        .Select(u => new ComplaintPaginationUserDto
                        {
                            Id = u.Id,
                            Name = u.Name,
                            Email = u.Email
                        })
                        .FirstOrDefault(),
                    UpdatedUser = _appDbContext.Users
                        .Where(u => u.Id == c.UpdatedUserId)
                        .Select(u => new ComplaintPaginationUserDto
                        {
                            Id = u.Id,
                            Name = u.Name,
                            Email = u.Email
                        })
                        .FirstOrDefault(),
                    Comments = _appDbContext.Comments
                        .Where(cm => cm.ComplaintId == c.Id)
                        .Select(cm => new ComplaintPaginationCommentDto
                        {
                            CommentString = cm.CommentString,
                            CreateDate = cm.CreateDate,
                            User = _appDbContext.Users
                                .Where(u => u.Id == cm.UserId)
                                .Select(u => new ComplaintPaginationUserDto
                                {
                                    Id = u.Id,
                                    Name = u.Name,
                                    Email = u.Email
                                })
                                .FirstOrDefault()
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (complaint == null)
            {
                return NotFound();
            }

            return Ok(complaint);
        }
    }
}
