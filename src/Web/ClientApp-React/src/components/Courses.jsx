import { useEffect, useState } from "react";
import { CourseServiceClient } from "../web-api-client.ts";
import "./stylesheets/Course.css";

const Courses = () => {
  const [courseList, setCourseList] = useState([]);
  const [displayCourse, setDisplayCourse] = useState({
    id: 0,
    courseId: 0,
    courseName: "",
    description: "",
    credits: 0,
  });

  useEffect(() => {
    retrieveAllCourses();
  }, []);

  //retrieve all courses
  const retrieveAllCourses = async () => {
    let client = new CourseServiceClient();
    console.log(client);
    const data = await client.getAllCourses();
    setCourseList(data);
    console.log(data);
  };

  //load course data to the form
  const LoadCourseData = (course, event) => {
    console.log(course);
  };

  return (
    <div>
      <div className="course-container">
        <h2>Course Details</h2>
        <div className="form-group">
          <label htmlFor="courseCode">Course Code</label>
          <input type="text" id="courseCode" value={displayCourse.courseId}/>
        </div>
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input type="text" id="courseName" value={displayCourse.courseName}/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="textarea" id="description" value={displayCourse.description}/>
        </div>
        <div className="form-group">
          <label htmlFor="courseCategory">Course Category</label>
          <select id="courseCategory">
            <option value="1">Undergraduate</option>
            <option value="2">Postgraduate</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="balance">Course Credits</label>
          <input type="number" id="courseCredits" />
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-success">
            Save
          </button>
          <button type="button" className="btn btn-info">
            Update
          </button>
          <button type="button" className="btn btn-danger">
            Delete
          </button>
          <button type="button" className="btn btn-warning">
            Clear
          </button>
        </div>
        <div className="course-list">
          <h5>Course List</h5>
          <ul className="list-group">
            {courseList.map((x) => (
              <li
                key={x.courseId}
                className="list-group-item list-group-item-light"
                onClick={(evnt) => LoadCourseData(x, evnt)}
              >
                {x.courseName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Courses;
