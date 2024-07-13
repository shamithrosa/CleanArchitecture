using CleanArchitecture.Application.Common.Interfaces;

namespace CleanArchitecture.Application.Courses.Commands;

public record DeleteCourseCommand(int Id) : IRequest;

public class DeleteCourseCommandHandler : IRequestHandler<DeleteCourseCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteCourseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DeleteCourseCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Courses
            .Where(l => l.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        _context.Courses.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
