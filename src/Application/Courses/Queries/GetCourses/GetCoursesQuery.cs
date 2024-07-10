using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.TodoLists.Queries.GetTodos;
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

    public Task<List<Course>> Handle(GetCoursesQuery request, CancellationToken cancellationToken)
    {
        var results = _context.Courses.OrderBy(x => x.CourseId).ToListAsync(cancellationToken);
        return results;
    }
}
