import React, { useState, useEffect } from 'react';
import apiService from '../../apiservice/apiservice';
import { Link } from 'react-router-dom';
import CreateCourse from './coursecreate';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.getAllCourses();
                setCourses(response);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);
    
    const reversedCourses = [...courses].reverse();

    return (
        <>
            <div className='container'>
                <div className='d-sm-flex justify-content-between align-items-center mb-5'>
                    <h3 className='mb-0'>All Courses</h3>
                    <button type="button" className="btn btn-green modal-btn" data-bs-toggle="modal" data-bs-target="#createModal">
                        Create Course
                    </button>
                </div>
                <div className='grid_04'>
                    {reversedCourses.map((course) => (
                        <Link to={`courses/details/${course._id}`} key={course._id}>
                            <div className='card h-100' key={course._id}>
                                <div className='course_thumbnail' style={{ backgroundImage: `url(${course.thumbnail})` }}></div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-12 mb-3'>
                                            <h5 className='mb-0'>{course.name}</h5>
                                        </div>
                                        <div className='col-12'>
                                            <p className='mb-0' style={{ textAlign: 'justify',height: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{course.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <CreateCourse />
        </>
    );
};

export { CreateCourse, CourseList };
