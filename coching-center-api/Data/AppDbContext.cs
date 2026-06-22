using coching_center_api.Models;
using Microsoft.EntityFrameworkCore;

namespace coching_center_api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Course> Courses => Set<Course>();
    public DbSet<Student> Students => Set<Student>();
}
