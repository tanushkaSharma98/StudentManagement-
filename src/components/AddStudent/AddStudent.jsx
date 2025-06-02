import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AddStudent.css';

const AddStudent = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, watch, reset } = useForm();

  const onFormSubmit = async (formData) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('dob', formData.dob);
    data.append('branch', formData.branch);
    data.append('semester', formData.semester);
    data.append('photo', formData.photo[0]); 

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:3000/students/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

       alert('✅ Student added successfully!');
    onSubmit(response.data);
    onClose();
    reset();
  } catch (error) {
    console.error('Error adding student:', error);
    alert('❌ Failed to add student. Please try again.');
  }
  };

  return (
    <div className="add-student-overlay">
      <div className="add-student-popup">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="add-student-form">
          <label>
            Name:
            <input type="text" {...register('name', { required: true })} />
          </label>
          <label>
            Email:
            <input type="email" {...register('email', { required: true })} />
          </label>
          <label>
            Date of Birth:
            <input type="date" {...register('dob', { required: true })} />
          </label>
          <label>
            Branch:
            <input type="text" {...register('branch', { required: true })} />
          </label>
          <label>
            Semester:
            <input type="number" min="1" max="8" {...register('semester', { required: true })} />
          </label>
          <label>
            Photo:
            <input type="file" accept="image/*" {...register('photo', { required: true })} />
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
