using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Enums;

namespace CleanArchitecture.Application.Courses.Commands;



public record UpdateCourseCommand : IRequest<int>
{
    public int Id { get; set; }
    public int CourseId { get; set; }
    public string CourseName { get; set; } = String.Empty;
    public string? Description { get; set; }
    public decimal Credits { get; set; }
    public CourseCategory Category { get; set; }
}

public class UpdateCourseCommandHandler : IRequestHandler<UpdateCourseCommand, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateCourseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateCourseCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Courses
            .FindAsync(new object[] { request.Id }, cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        entity.CourseId = request.CourseId;
        entity.CourseName = request.CourseName;
        entity.Description = request.Description;
        entity.Credits = request.Credits;
        entity.Category = request.Category;

        return await _context.SaveChangesAsync(cancellationToken);
    }
}
