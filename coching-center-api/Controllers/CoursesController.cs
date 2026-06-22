using coching_center_api.Contracts;
using coching_center_api.Data;
using coching_center_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace coching_center_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public CoursesController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Course>>> GetAll()
    {
        var courses = await _dbContext.Courses.OrderBy(x => x.Name).ToListAsync();
        return Ok(courses);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Course>> Create([FromBody] CourseRequest request)
    {
        var course = new Course
        {
            Name = request.Name.Trim(),
            Description = request.Description.Trim(),
            Fees = request.Fees
        };

        _dbContext.Courses.Add(course);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = course.Id }, course);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<Course>> Update([FromRoute] int id, [FromBody] CourseRequest request)
    {
        var course = await _dbContext.Courses.FirstOrDefaultAsync(x => x.Id == id);
        if (course is null)
        {
            return NotFound();
        }

        course.Name = request.Name.Trim();
        course.Description = request.Description.Trim();
        course.Fees = request.Fees;
        await _dbContext.SaveChangesAsync();

        return Ok(course);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var usedByStudents = await _dbContext.Students.AnyAsync(x => x.CourseId == id);
        if (usedByStudents)
        {
            return BadRequest("Course is assigned to one or more students");
        }

        var course = await _dbContext.Courses.FirstOrDefaultAsync(x => x.Id == id);
        if (course is null)
        {
            return NotFound();
        }

        _dbContext.Courses.Remove(course);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }
}
