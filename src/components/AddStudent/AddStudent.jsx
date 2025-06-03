import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AddStudent.css';

const AddStudent = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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

      setIsSuccess(true);
      setStatusMessage('Student added successfully!');
      onSubmit(response.data);
      reset();

      setTimeout(() => {
        setStatusMessage('');
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error adding student:', error);
      setIsSuccess(false);
      setStatusMessage('Failed to add student. Please try again.');
    }
  };

  return (
    <div className="add-student-overlay">
      <div className="add-student-popup">
        <h2>Add New Student</h2>

        {statusMessage && (
          <div className={`status-message ${isSuccess ? 'success' : 'error'}`}>
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onFormSubmit)} className="add-student-form">
          <label>
            Name:
            <input type="text" {...register('name', { required: 'Name is required' })} />
            {errors.name && <span className="error-msg">{errors.name.message}</span>}
          </label>
          
          <label>
            Email:
            <input type="email" {...register('email', { required: 'Email is required' })} />
            {errors.email && <span className="error-msg">{errors.email.message}</span>}
          </label>
          
          <label>
            Date of Birth:
            <input type="date" {...register('dob', { required: 'Date of Birth is required' })} />
            {errors.dob && <span className="error-msg">{errors.dob.message}</span>}
          </label>
          
          <label>
            Branch:
            <input type="text" {...register('branch', { required: 'Branch is required' })} />
            {errors.branch && <span className="error-msg">{errors.branch.message}</span>}
          </label>
          
          <label>
            Semester:
            <input
              type="number"
              min="1"
              max="8"
              {...register('semester', { required: 'Semester is required' })}
            />
            {errors.semester && <span className="error-msg">{errors.semester.message}</span>}
          </label>
          
          <label>
            Photo:
            <input
              type="file"
              accept="image/*"
              {...register('photo', {
                required: 'Please upload a photo',
              })}
            />
            {errors.photo && <span className="error-msg">{errors.photo.message}</span>}
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
