
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Application.Courses.Commands;
using CleanArchitecture.Application.Courses.Queries.GetCourses;
using CleanArchitecture.Application.TodoItems.Commands.CreateTodoItem;
using CleanArchitecture.Application.TodoItems.Queries.GetTodoItemsWithPagination;
using CleanArchitecture.Application.TodoLists.Queries.GetTodos;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Web.Endpoints;

public class Courses : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapPost(CreateCourse)
            .MapGet(GetAllCourses);
    }

    public Task<List<Course>> GetAllCourses(ISender sender)
    {
        var result = sender.Send(new GetCoursesQuery());
        return result;
    }

    public Task<int> CreateCourse(ISender sender, CreateCourseCommand command)
    {
        var result = sender.Send(command);
        return result;
    }
}
