import React, { useState } from 'react';
import axios from 'axios';
import './AddStudent.css';

const AddStudent = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    branch: '',
    semester: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('dob', formData.dob);
    data.append('branch', formData.branch);
    data.append('semester', formData.semester);
    data.append('photo', formData.photo);

    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.post('http://localhost:3000/students/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, 
        },
      });

      onSubmit(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student. Please try again.');
    }
  };

  return (
    <div className="add-student-overlay">
      <div className="add-student-popup">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit} className="add-student-form">
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Date of Birth:
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </label>
          <label>
            Branch:
            <input type="text" name="branch" value={formData.branch} onChange={handleChange} required />
          </label>
          <label>
            Semester:
            <input type="number" name="semester" value={formData.semester} onChange={handleChange} required min="1" max="8" />
          </label>
          <label>
            Photo:
            <input type="file" name="photo" accept="image/*" onChange={handleChange} required />
          </label>
          <div className="popup-buttons">
            <button type="submit" className="submit-btn">Add Student</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
