import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../apiservice/apiservice';

function Studentupdate({ studentId }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await apiService.getStudentById(studentId);
                setFormData(data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };

        fetchStudent();
    }, [studentId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await apiService.updateStudent(studentId, formData);
            console.log('Student updated successfully');
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <>
            <div className="modal fade" id="studentupdateModal" tabIndex="-1" aria-labelledby="studentupdateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="studentupdateModalLabel">Update Student</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-md-12 mb-3'>
                                        <label className="form-label w-100">Name</label>
                                        <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className='col-md-12'>
                                        <label className="form-label w-100">Email</label>
                                        <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-red" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-green">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Studentupdate;
