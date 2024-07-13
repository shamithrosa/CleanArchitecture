import { useEffect, useState } from "react";
import { CourseServiceClient } from "./../api/course-api-client.ts";
import "./stylesheets/Course.css";
import axios from "axios";

const Courses = () => {
  const [pageReload, setPageReload] = useState(false);
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
  }, [pageReload]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDisplayCourse((prevCourse) => ({
      ...prevCourse,
      [id]: value,
    }));
  };

  //retrieve all courses
  const retrieveAllCourses = async () => {
    /* Using API Client */

    let client = new CourseServiceClient();
    const data = await client.getAllCourses();
    setCourseList(data);

    /* Using Axios */
    // const baseUrl = window.location.origin;
    // axios
    //   .get(`${baseUrl}/api/courses`)
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //     if (response.data) {
    //       setCourseList(response.data);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {});
  };

  //load course data to the form
  const LoadCourseDetailsToForm = (course, event) => {
    console.log(course);
    setDisplayCourse(course);
  };

  //on Adding a new record
  const onAddBtnClick = async () => {
    /* Using API Client */
    // let client = new CourseServiceClient();
    // let response = await client.createNewCourse(displayCourse);

    /* Using Axios */
    let obj = {
      courseId: parseInt(displayCourse.courseId),
      courseName: displayCourse.courseName,
      description: displayCourse.description,
      credits: parseFloat(displayCourse.credits),
      category: parseInt(displayCourse.category),
    };
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/api/Courses`;
    axios
      .post(url, obj)
      .then((response) => {
        console.log("Response:", response.data);
        alert("Course Created");
        onClearBtnClick();
        setPageReload(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //on Updating record
  const onUpdateBtnClick = () => {
    /* Using Axios */
    let courseId = displayCourse.id;
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/api/Courses/${courseId}`;

    let obj = {
      id: parseInt(displayCourse.id),
      courseId: parseInt(displayCourse.courseId),
      courseName: displayCourse.courseName,
      description: displayCourse.description,
      credits: parseFloat(displayCourse.credits),
      category: parseInt(displayCourse.category),
    };
    axios
      .put(url, obj)
      .then((response) => {
        console.log("Response:", response.data);
        alert("Course Updated");
        onClearBtnClick();
        setPageReload(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //on Deleteing a record
  const onDeleteBtnClick = () => {
    const courseId = displayCourse.id;
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/api/Courses/${courseId}`;

    /* Using Axios */
    axios
      .delete(url)
      .then((response) => {
        console.log("Response:", response.data);
        alert("Course Deleted");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    onClearBtnClick();
    setPageReload(true);
  };

  //on Clearing the form
  const onClearBtnClick = () => {
    setDisplayCourse({
      id: null,
      courseId: 0,
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
            {courseList.length == 0 ? (
              <li>No Data</li>
            ) : (
              courseList.map((x) => (
                <li
                  key={x.courseId}
                  className="list-group-item list-group-item-light"
                  onClick={(evnt) => LoadCourseDetailsToForm(x, evnt)}
                >
                  {x.courseName}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Courses;
