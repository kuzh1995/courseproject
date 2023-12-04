// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../apiservice/apiservice';
import Courseupdate from './courseupdate';
import Coursedelete from './coursedelete';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiService.getCourseById(id);
                setCourse(response);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourse();
    }, [id]);

    return (
        <>
            <div className='container'>
                <div className='d-sm-flex justify-content-between align-items-center mb-5'>
                    <h3 className='mb-0'>Course Details</h3>
                    <div className='group_btn'>
                        <button type="button" className="btn btn-green modal-btn" data-bs-toggle="modal" data-bs-target="#updateModal">
                            Update
                        </button>
                        <button type="button" className="btn btn-red modal-btn" data-bs-toggle="modal" data-bs-target="#deleteModal">
                            Delete
                        </button>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-lg-5'>
                        {course ? (
                            <div className='card'>
                                {course.thumbnail && (
                                    <div className='course_thumbnail' style={{ backgroundImage: `url(${course.thumbnail})`, height: '300px' }}></div>
                                )}
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-md-6 mb-3'>
                                            <b className='mb-0'>Name:</b>
                                            <p className='mb-0'>{course.name}</p>
                                        </div>
                                        <div className='col-md-6 mb-3'>
                                            <b className='mb-0'>Instructor:</b>
                                            <p className='mb-0'>{course.instructor}</p>
                                        </div>
                                        <div className='col-12 mb-3'>
                                            <b className='mb-0'>Description:</b>
                                            <p className='mb-0' style={{ textAlign: 'justify' }}>{course.description}</p>
                                        </div>
                                        <div className='col-md-6 mb-3'>
                                            <b className='mb-0'>Status:</b>
                                            <p className='mb-0'>{course.status}</p>
                                        </div>
                                        <div className='col-md-6 mb-3'>
                                            <b className='mb-0'>Duration:</b>
                                            <p className='mb-0'>{course.duration}</p>
                                        </div>
                                        <div className='col-md-6 mb-3'>
                                            <b className='mb-0'>Schedule:</b>
                                            <p className='mb-0'>{course.schedule}</p>
                                        </div>
                                        <div className='col-md-6 mb-3'>
                                            <b className='mb-0'>Location:</b>
                                            <p className='mb-0'>{course.location}</p>
                                        </div>
                                        <div className='col-md-6 mb-3'>
                                            <b className='mb-0'>Prerequisites:</b>
                                            <p className='mb-0'>{course.prerequisites.join(', ')}</p>
                                        </div>
                                        <div className='col-md-6'>
                                            <b className='mb-0'>Syllabus:</b>
                                            <p className='mb-0'>{course.syllabus.join(', ')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
            <Courseupdate courseId={id} />
            <Coursedelete courseId={id} />
        </>
    );
};

export default CourseDetails;
