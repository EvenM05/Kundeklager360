using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Kundeklager.Enums;

namespace Kundeklager.Models.Dto
{
    // Dto for defining what data is required when creating a new comment
    public class CreateCommentDto
    {
        public Guid id { get; set;}  = Guid.NewGuid();

        public string? CommentString { get; set;}

        public DateTime CreateDate { get; set;}

        public Guid UserId {get; set; }


        public Guid ComplaintId {get; set; }

    }
}