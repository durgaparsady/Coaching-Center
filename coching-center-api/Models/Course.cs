namespace coching_center_api.Models;

public class Course
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Fees { get; set; }

    public ICollection<Student> Students { get; set; } = new List<Student>();
}
