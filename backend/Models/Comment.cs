using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Kundeklager.Enums;

namespace Kundeklager.Models
{
    // Database model for the comment table
    public class Comment
    {
        [Key]
        public Guid Id { get; set;}  = Guid.NewGuid();

        [Required]
        [StringLength(250)]
        public string? CommentString { get; set;}

        public DateTime CreateDate { get; set; }

        public Guid UserId {get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public Guid ComplaintId { get; set; }
        
        [ForeignKey("ComplaintId")]
        public Complaint Complaint { get; set; } = null!;

    }
}