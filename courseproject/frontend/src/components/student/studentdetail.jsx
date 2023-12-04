import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../apiservice/apiservice';
import Studentupdate from './studentupdate';
import Studentdelete from './studentdelete';

function Studentdetail() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await apiService.getStudentById(id);
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };

        fetchStudent();
    }, [id]);

    return (
        <>
            <div className='container'>
                <div className='d-sm-flex justify-content-between align-items-center mb-5'>
                    <h3 className='mb-0'>Student Details</h3>
                    <div className='group_btn'>
                        <button type="button" className="btn btn-green modal-btn" data-bs-toggle="modal" data-bs-target="#studentupdateModal">
                            Update
                        </button>
                        <button type="button" className="btn btn-red modal-btn" data-bs-toggle="modal" data-bs-target="#studentdeleteModal">
                            Delete
                        </button>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-lg-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='col-12'>
                                    {student ? (
                                        <div className='row'>
                                            <div className='col-12 mb-3'>
                                                <b className='mb-0'>Name</b>
                                                <p className='mb-0'>{student.name}</p>
                                            </div>
                                            <div className='col-12'>
                                                <b className='mb-0'>Email</b>
                                                <p className='mb-0'>{student.email}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Studentupdate studentId={id} />
            <Studentdelete studentId={id} />
        </>
    );
}

export default Studentdetail;
