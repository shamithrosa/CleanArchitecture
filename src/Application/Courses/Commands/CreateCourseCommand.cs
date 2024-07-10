using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using CleanArchitecture.Domain.Events;

namespace CleanArchitecture.Application.Courses.Commands;
public record CreateCourseCommand : IRequest<int>
{
    public int CourseId { get; set; }
    public string CourseName { get; set; } = String.Empty;
    public string? Description { get; set; }
    public decimal Credits { get; set; }
    public CourseCategory Category { get; set; }
}

public class CreateCourseCommandHandler : IRequestHandler<CreateCourseCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateCourseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
    {
        var entity = new Course
        {
            CourseId = request.CourseId,
            CourseName = request.CourseName,
            Description = request.Description,
            Credits = request.Credits,
            Category = request.Category
        };

        entity.AddDomainEvent(new CourseCreatedEvent(entity));

        _context.Courses.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
