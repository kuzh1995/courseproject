import React, { useState, useEffect } from 'react';
import apiService from '../../apiservice/apiservice';
import { Link } from 'react-router-dom';
import Studentcreate from './studentcreate';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiService.getStudents();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchData();
    }, []);

    const reversedStudents = [...students].reverse();

    return (
        <>
            <div className='container'>
                <div className='d-sm-flex justify-content-between align-items-center mb-5'>
                    <h3 className='mb-0'>All Students</h3>
                    <button type="button" className="btn btn-green modal-btn" data-bs-toggle="modal" data-bs-target="#studentcreateModal">
                        Create Course
                    </button>
                </div>
                <div className='grid_04'>
                    {reversedStudents.map((student) => (
                        <Link to={`/students/details/${student._id}`} key={student._id}>
                            <div className='card h-100'>
                                <div className='card-body'>
                                    <div className='col-12 mb-3'>
                                        <b className='mb-0'>Name</b>
                                        <p className='mb-0'>{student.name}</p>
                                    </div>
                                    <div className='col-12'>
                                        <b className='mb-0'>Email</b>
                                        <p className='mb-0'>{student.email}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Studentcreate />
        </>

    );
};

export default StudentList;
