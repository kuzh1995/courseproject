import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import apiService from '../../apiservice/apiservice';

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        name: '',
        instructor: '',
        description: '',
        status: '',
        duration: '',
        schedule: '',
        location: '',
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleArrayChange = (e) => {
        const arrayValue = e.target.value.split('\n').map((item) => item.trim());
        setFormData({
            ...formData,
            [e.target.name]: arrayValue,
        });
    };

    const handleThumbnailChange = (e) => {
        setFormData({
            ...formData,
            thumbnail: e.target.files[0],
        });
    };

    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            status: e.target.value,
        });
    };

    const handleMultiSelectChange = (selectedOptions) => {
        setFormData({
            ...formData,
            prerequisites: selectedOptions.map((option) => option.value),
        });
    };

    const handleSyllabusChange = (selectedOptions) => {
        setFormData({
            ...formData,
            syllabus: selectedOptions.map((option) => option.value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const courseData = new FormData();
        for (const key in formData) {
            if (key === 'status' || key === 'syllabus') {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach((item, index) => {
                        courseData.append(`${key}[${index}]`, item);
                    });
                } else {
                    courseData.append(key, formData[key]);
                }
            } else {
                courseData.append(key, formData[key]);
            }
        }

        try {
            const response = await apiService.createCourse(courseData);
            console.log('New course created:', response);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{ maxWidth: '583px' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="createModalLabel">
                            Create Course
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Name</label>
                                    <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Instructor</label>
                                    <input className="form-control" type="text" name="instructor" value={formData.instructor} onChange={handleChange} />
                                </div>
                                <div className='col-12 mb-3'>
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows={4} name="description" value={formData.description} onChange={handleChange}></textarea>
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Prerequisites</label>
                                    <MultiSelect
                                        options={options}
                                        value={formData.prerequisites.map((prerequisite) => ({ label: prerequisite, value: prerequisite }))}
                                        onChange={handleMultiSelectChange}
                                        labelledBy={"Select"}
                                        isCreatable={true}
                                    />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Duration</label>
                                    <input className="form-control" type="text" name="duration" value={formData.duration} onChange={handleChange} />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Schedule</label>
                                    <input className="form-control" type="text" name="schedule" value={formData.schedule} onChange={handleChange} />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label w-100">Status:</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="checkbox"
                                            name="status"
                                            value="Open"
                                            checked={formData.status === 'Open'}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label">Open</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="checkbox"
                                            name="status"
                                            value="Closed"
                                            checked={formData.status === 'Closed'}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label">Closed</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="checkbox"
                                            name="status"
                                            value="In Process"
                                            checked={formData.status === 'In Process'}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label">In Process</label>
                                    </div>
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Location</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="location"
                                        value='Online'
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className="form-label">Syllabus</label>
                                    <MultiSelect
                                        options={formData.syllabus.map((item) => ({ label: item, value: item }))}
                                        value={formData.syllabus.map((item) => ({ label: item, value: item }))}
                                        onChange={handleSyllabusChange}
                                        isCreatable={true}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label className="form-label">Course Image</label>
                                    <input className="form-control" type="file" name="thumbnail" onChange={handleThumbnailChange} required />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-red" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-green" onClick={handleSubmit}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
