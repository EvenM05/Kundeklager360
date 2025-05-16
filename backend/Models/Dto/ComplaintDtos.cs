using Kundeklager.Enums;

namespace Kundeklager.Models.Dto
{
    // Dto for the data provided by the database when using the complaint pagination request
    public class ComplaintPaginationDto
    {
        public Guid Id { get; set; }
        public string Customer { get; set; }
        public string Description { get; set; }
        public PriorityLevel? Priority { get; set; }
        public StatusProcess? Status { get; set; }

        public ComplaintVariant? ComplaintVariant { get; set;}
        public DateTime CreateDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public Guid CreatedUserId { get; set; }
        public Guid UpdatedUserId { get; set; }
        public ComplaintPaginationUserDto CreatedUser { get; set; }
        public ComplaintPaginationUserDto UpdatedUser { get; set; }
        public List<ComplaintPaginationCommentDto> Comments { get; set; }
    }

    //  Dto for the data in the CreatedUser object and UpdatedUser object in ComplaintPagination
    public class ComplaintPaginationUserDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }

    // Dto for the data for the comment object in ComplaintPagination
    public class ComplaintPaginationCommentDto
    {
        public string CommentString { get; set; }
        public DateTime CreateDate { get; set; }
        public ComplaintPaginationUserDto User { get; set; }
    }

    // Dto for the data required when creating a new complaint
    public class CreateComplaintDto
    {
        public string? Customer { get; set;}

        public string? Description { get; set;}

        public PriorityLevel? Priority { get; set;}

        public StatusProcess Status { get; set;}
        public ComplaintVariant ComplaintVariant { get; set; }

        public Guid CreatedUserId {get; set; }
        public Guid UpdatedUserId {get; set; }

    }

    // Dto for the provided data from the getAllComplaints request
    public class GetAllComplaintsDto
    {

        public string? Customer { get; set;}

        public string? Description { get; set;}

        public PriorityLevel? Priority { get; set;}

        public StatusProcess Status { get; set;}

        public DateTime CreateDate { get; set;}

        public DateTime UpdatedDate { get; set;}

        public Guid UserId {get; set; }

        public User? User { get; set; }
    }
    
    // Dto for the data required when updating the data in a complaint
    public class UpdateComplaintDto
    {

        public string? Customer { get; set;}

        public string? Description { get; set;}

        public PriorityLevel? Priority { get; set;}

        public StatusProcess? Status { get; set;}

        public ComplaintVariant? ComplaintVariant { get; set;}

        public Guid UpdatedUserId { get; set; }

    }
}