using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Kundeklager.Enums;

namespace Kundeklager.Models
{
    public class Complaint
    {
        [Key]
        public Guid Id { get; set;}  = Guid.NewGuid();

        [Required]
        [StringLength(50)]
        public string? Customer { get; set;}

        [Required]
        [StringLength(250)]
        public string? Description { get; set;}

        [Required]
        public PriorityLevel? Priority { get; set;}

        [Required]
        public StatusProcess? Status { get; set;}

        public ComplaintVariant? ComplaintVariant { get; set;}

        [Required]
        public DateTime CreateDate { get; set;}

        public DateTime UpdatedDate { get; set;}

        public Guid CreatedUserId {get; set; }

        public User? CreatedUser { get; set; }

        public Guid UpdatedUserId {get; set; }

        public User? UpdatedUser { get; set; }


        public ICollection<Comment>? Comments { get; set; } = new List<Comment>();
    }
}