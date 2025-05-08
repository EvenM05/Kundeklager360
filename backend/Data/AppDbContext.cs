using Kundeklager.Models;
using Microsoft.EntityFrameworkCore;

namespace Kundeklager.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Complaint> Complaints { get; set; }

        public DbSet<User> Users { get; set; }
        
        public DbSet<Comment> Comments { get; set; }

    }
}