// src/components/course/CourseUpdate.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import apiService from '../../apiservice/apiservice';

function CourseUpdate() {

    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        instructor: '',
        description: '',
        status: '',
        duration: '',
        schedule: '',
        prerequisites: [],
        syllabus: [],
        student: '',
        thumbnail: null,
    });

    const options = [
        { label: 'React JS', value: 'React JS' },
        { label: 'Redux', value: 'Redux' },
        { label: 'HTML', value: 'HTML' },
        { label: 'CSS', value: 'CSS' },
        { label: 'SCSS', value: 'SCSS' },
    ];

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiService.getCourseById(id);
                setFormData(response);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, [id]);

    const handleMultiSelectChange = (selectedOptions) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            prerequisites: selectedOptions.map((option) => option.value),
        }));
    };

    const handleSyllabusChange = (selectedOptions) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            syllabus: selectedOptions.map((option) => option.value),
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            status: checked ? name : (prevFormData.status === name ? '' : prevFormData.status),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleThumbnailChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            thumbnail: e.target.files[0],
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const courseData = {};
        for (const key in formData) {
            if (key === 'prerequisites' || key === 'syllabus') {
                courseData[key] = formData[key].map(item => item);
            } else {
                courseData[key] = formData[key];
            }
        }
        console.log(courseData);
        try {
            const response = await apiService.updateCourse(id, courseData);
            console.log('Course updated successfully:', response);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="updateModalLabel">Update Course</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Name</label>
                                    <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter course name" required />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Instructor</label>
                                    <input className="form-control" type="text" name="instructor" value={formData.instructor} onChange={handleChange} placeholder="Enter instructor name" />
                                </div>
                                <div className='col-12 mb-3'>
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows={4} name="description" value={formData.description} onChange={handleChange} placeholder="Enter course description"></textarea>
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Prerequisites</label>
                                    <MultiSelect
                                        options={options}
                                        value={formData.prerequisites.map((prerequisite) => ({ label: prerequisite, value: prerequisite }))}
                                        onChange={handleMultiSelectChange}
                                        labelledBy={"Select"}
                                        isCreatable={true}
                                        placeholder="Select prerequisites"
                                    />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Duration</label>
                                    <input className="form-control" type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Enter course duration" />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Schedule</label>
                                    <input className="form-control" type="text" name="schedule" value={formData.schedule} onChange={handleChange} placeholder="Enter course schedule" />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label w-100">Status:</label>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="Open"
                                            checked={formData.status === 'Open'}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label">Open</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="Closed"
                                            checked={formData.status === 'Closed'}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label">Closed</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="In Process"
                                            checked={formData.status === 'In Process'}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label">In Process</label>
                                    </div>
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Syllabus</label>
                                    <MultiSelect
                                        options={formData.syllabus.map((item) => ({ label: item, value: item }))}
                                        value={formData.syllabus.map((item) => ({ label: item, value: item }))}
                                        onChange={handleSyllabusChange}
                                        isCreatable={true}
                                        placeholder="Select syllabus"
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label className="form-label">Course Image</label>
                                    <input className="form-control" type="file" name="thumbnail" onChange={handleThumbnailChange} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-red" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" className="btn btn-green" onClick={handleSubmit}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseUpdate;
