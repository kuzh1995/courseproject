import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../apiservice/apiservice';

function Studentdelete({ studentId, history }) {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await apiService.getStudentById(studentId);
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };

        fetchStudent();
    }, [studentId]);

    const handleDelete = async () => {
        try {
            await apiService.deleteStudent(studentId);
            console.log('Student deleted successfully');

            history.push('/students');
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <>
            <div className="modal fade" id="studentdeleteModal" tabIndex="-1" aria-labelledby="studentdeleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body pb-0">
                            <h1 className="modal-title fs-5 text-center" id="studentdeleteModalLabel">Do you want to Delete this Student ?</h1>
                            <div className='row' style={{display: 'none'}}>
                                <div className='col-12'>
                                    {student ? (
                                        <div>
                                            <p>
                                                <strong>Name:</strong> {student.name}
                                            </p>
                                            <p>
                                                <strong>Email:</strong> {student.email}
                                            </p>
                                        </div>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer  justify-content-center">
                            <button type="button" className="btn btn-red" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-green" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Studentdelete;
