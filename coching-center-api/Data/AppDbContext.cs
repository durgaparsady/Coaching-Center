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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>()
            .Property(x => x.Fees)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Course>().HasData(
            new Course { Id = 1, Name = "Mathematics", Description = "Foundation to advanced batches", Fees = 18000 },
            new Course { Id = 2, Name = "Physics", Description = "Board and competitive prep", Fees = 21000 },
            new Course { Id = 3, Name = "English", Description = "Grammar and speaking", Fees = 12000 }
        );

        modelBuilder.Entity<Student>().HasData(
            new Student
            {
                Id = 1,
                FullName = "Aarav Sharma",
                Email = "aarav@example.com",
                PhoneNumber = "9876543210",
                CourseId = 1
            }
        );

        modelBuilder.Entity<Student>()
            .HasOne(x => x.Course)
            .WithMany(x => x.Students)
            .HasForeignKey(x => x.CourseId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
