import { useEffect, useState } from "react";
//import { CourseServiceClient } from '../web-api-client.ts';
import { CourseServiceClient } from "./../api/course-api-client.ts";
import "./stylesheets/Course.css";

const Courses = () => {
  const [courseList, setCourseList] = useState([]);
  const [displayCourse, setDisplayCourse] = useState({
    id: 0,
    courseId: 0,
    courseName: "",
    description: "",
    credits: 0,
    category: 0,
  });

  useEffect(() => {
    retrieveAllCourses();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDisplayCourse((prevCourse) => ({
      ...prevCourse,
      [id]: value,
    }));
  };

  //retrieve all courses
  const retrieveAllCourses = async () => {
    let client = new CourseServiceClient();
    const data = await client.getAllCourses();
    setCourseList(data);
  };

  //load course data to the form
  const LoadCourseDetailsToForm = (course, event) => {
    console.log(course);
    setDisplayCourse(course);
  };

  //on Adding a new record
  const onAddBtnClick = async () => {
    let client = new CourseServiceClient();
    let response = await client.createNewCourse(displayCourse);
  };

  //on Updating record
  const onUpdateBtnClick = () => {};

  //on Deleteing a record
  const onDeleteBtnClick = () => {};

  //on Clearing the form
  const onClearBtnClick = () => {
    setDisplayCourse({
      id: null,
      courseId: null,
      courseName: "",
      description: "",
      credits: 0,
      category: 0,
    });
  };

  return (
    <div>
      <div className="course-container">
        <h2>Course Details</h2>
        <div className="form-group">
          <label htmlFor="courseId">Course Code</label>
          <input
            type="text"
            className="form-control"
            id="courseId"
            value={displayCourse.courseId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            value={displayCourse.courseName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            rows="5"
            id="description"
            value={displayCourse.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Course Category</label>
          <select
            id="category"
            className="form-control"
            value={displayCourse.category}
            onChange={handleInputChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="1">Undergraduate</option>
            <option value="2">Postgraduate</option>
            <option value="3">Certificate</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="credits">Course Credits</label>
          <input
            className="form-control"
            type="number"
            id="credits"
            value={displayCourse.credits}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-success"
            onClick={onAddBtnClick}
          >
            Add
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={onUpdateBtnClick}
          >
            Update
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onDeleteBtnClick}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={onClearBtnClick}
          >
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
                onClick={(evnt) => LoadCourseDetailsToForm(x, evnt)}
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
