namespace CleanArchitecture.Domain.Events;
public class CourseCreatedEvent : BaseEvent
{
    public Course Course { get; }
    public CourseCreatedEvent(Course course)
    {
        Course = course;
    }
}
