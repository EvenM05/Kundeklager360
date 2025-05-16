using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Kundeklager.Enums;

namespace Kundeklager.Models
{
    // Dto for defining what data is provided when getting data from the user table in the database
    public class GetUserDto
    {
        public Guid Id { get; set; }
        public string? Name { get; set;}

        public string? Email { get; set;}        
    }
}