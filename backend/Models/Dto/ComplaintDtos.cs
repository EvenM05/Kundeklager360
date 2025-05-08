using Kundeklager.Enums;

namespace Kundeklager.Models.Dto
{

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

    public class ComplaintPaginationUserDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class ComplaintPaginationCommentDto
    {
        public string CommentString { get; set; }
        public DateTime CreateDate { get; set; }
        public ComplaintPaginationUserDto User { get; set; }
    }

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