using coching_center_api.Contracts;
using coching_center_api.Data;
using coching_center_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace coching_center_api.Controllers;

public record StudentListItem(int Id, string FullName, string Email, string PhoneNumber, int CourseId, string CourseName);

[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public StudentsController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentListItem>>> GetAll()
    {
        var data = await _dbContext.Students
            .Include(x => x.Course)
            .OrderBy(s => s.FullName)
            .Select(s => new StudentListItem(s.Id, s.FullName, s.Email, s.PhoneNumber, s.CourseId, s.Course != null ? s.Course.Name : "N/A"))
            .ToListAsync();

        return Ok(data);
    }

    [HttpPost]
    public async Task<ActionResult<Student>> Create([FromBody] StudentRequest request)
    {
        var courseExists = await _dbContext.Courses.AnyAsync(x => x.Id == request.CourseId);
        if (!courseExists)
        {
            return BadRequest("Selected course does not exist");
        }

        var student = new Student
        {
            FullName = request.FullName.Trim(),
            Email = request.Email.Trim(),
            PhoneNumber = request.PhoneNumber.Trim(),
            CourseId = request.CourseId
        };

        _dbContext.Students.Add(student);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = student.Id }, student);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Student>> Update([FromRoute] int id, [FromBody] StudentRequest request)
    {
        var student = await _dbContext.Students.FirstOrDefaultAsync(x => x.Id == id);
        if (student is null)
        {
            return NotFound();
        }

        var courseExists = await _dbContext.Courses.AnyAsync(x => x.Id == request.CourseId);
        if (!courseExists)
        {
            return BadRequest("Selected course does not exist");
        }

        student.FullName = request.FullName.Trim();
        student.Email = request.Email.Trim();
        student.PhoneNumber = request.PhoneNumber.Trim();
        student.CourseId = request.CourseId;
        await _dbContext.SaveChangesAsync();

        return Ok(student);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var student = await _dbContext.Students.FirstOrDefaultAsync(x => x.Id == id);
        if (student is null)
        {
            return NotFound();
        }

        _dbContext.Students.Remove(student);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }
}
