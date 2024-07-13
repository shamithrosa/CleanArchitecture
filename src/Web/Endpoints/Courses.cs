using CleanArchitecture.Application.Courses.Commands;
using CleanArchitecture.Application.Courses.Queries.GetCourses;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Web.Endpoints;

public class Courses : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetAllCourses)
            .MapPost(CreateCourse)
            .MapPut(UpdateCourse, "{id}")
            .MapDelete(DeleteCourse, "{id}");
    }

    public async Task<List<Course>> GetAllCourses(ISender sender)
    {
        return await sender.Send(new GetCoursesQuery());       
    }

    public async Task<int> CreateCourse(ISender sender, CreateCourseCommand command)
    {
        var result = await sender.Send(command);
        return result;
    }

    public async Task<IResult> UpdateCourse(ISender sender, int id, UpdateCourseCommand command)
    {
        if (id != command.Id)
            return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> DeleteCourse(ISender sender, int id)
    {
        await sender.Send(new DeleteCourseCommand(id));
        return Results.NoContent();
    }
}
