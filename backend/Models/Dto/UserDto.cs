using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Kundeklager.Enums;

namespace Kundeklager.Models
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string? Name { get; set;}

        public string? Email { get; set;}


        
    }
}