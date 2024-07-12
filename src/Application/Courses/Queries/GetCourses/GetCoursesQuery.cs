using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Courses.Queries.GetCourses;

public record GetCoursesQuery : IRequest<List<Course>>;

public class GetCoursesQueryHandler : IRequestHandler<GetCoursesQuery, List<Course>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCoursesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<Course>> Handle(GetCoursesQuery request, CancellationToken cancellationToken)
    {
        var results = await _context.Courses.OrderBy(x => x.CourseId).ToListAsync(cancellationToken);
        return results;
    }
}
