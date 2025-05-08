using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Kundeklager.Enums;

namespace Kundeklager.Models
{
    public class LoginDto
    {
        public string? Email { get; set;}
        public string? Password { get; set;}

    }
}