namespace Kundeklager.Models.Dto
{
    // Dto for defining what data is provided when getting data from the user table in the database
    public class UserDto
    {
        public string? Name { get; set;}

        public string? Email { get; set;}

        public string? Password { get; set; }
    }
}