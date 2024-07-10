namespace CleanArchitecture.Domain.Entities;

public class Course : BaseAuditableEntity
{
    public int CourseId { get; set; }
    public string CourseName { get; set; } = String.Empty;
    public string? Description { get; set; }
    public decimal Credits { get; set; }
    public CourseCategory Category { get; set; }
}
