import React, { useState, useEffect } from 'react';
import apiService from '../../apiservice/apiservice';
import { useParams } from 'react-router-dom';

function Coursedelete({ courseId }) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiService.getCourseById(courseId);
        setCourse(response);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleDelete = async () => {
    try {
      await apiService.deleteCourse(courseId);
      console.log('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body pb-0">
            {course ? (
              <div style={{display: 'none'}}>
                <p>
                  <strong>Name:</strong> {course.name}
                </p>
                <p>
                  <strong>Instructor:</strong> {course.instructor}
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <h1 className="modal-title p-0 fs-5 text-center" id="deleteModalLabel">Do you want to Delete this course ?</h1>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-red" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" className="btn btn-green" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coursedelete;
