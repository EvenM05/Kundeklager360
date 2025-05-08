using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Kundeklager.Enums;

namespace Kundeklager.Models.Dto
{
    public class CreateUserDto
    {
        public string? Name { get; set;}

        public string? Email { get; set;}

        public string? Password { get; set; }
    }
}