using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Kundeklager.Enums;

namespace Kundeklager.Models
{
    // Dto for defining what data is required when sending a request to the database 
    public class LoginDto
    {
        public string? Email { get; set;}
        public string? Password { get; set;}

    }
}