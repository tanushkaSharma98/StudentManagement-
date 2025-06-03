import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './AddStudent.css';

// zod Schema==
const studentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  dob: z.string().min(1, 'Date of birth is required'),
  branch: z.string().min(1, 'Branch is required'),
  semester: z
    .string()
    .min(1, 'Semester is required')
    .refine((val) => Number(val) >= 1 && Number(val) <= 8, {
      message: 'Semester must be between 1 and 8',
    }),
  photo: z
    .any()
    .refine((files) => files?.length > 0, { message: 'Photo is required' }),
});


const AddStudent = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
  });

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
          Authorization: `Bearer ${token}`,
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
            <input type="text" {...register('name')} />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </label>
          <label>
            Email:
            <input type="email" {...register('email')} />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </label>
          <label>
            Date of Birth:
            <input type="date" {...register('dob')} />
            {errors.dob && <p className="error">{errors.dob.message}</p>}
          </label>
          <label>
            Branch:
            <input type="text" {...register('branch')} />
            {errors.branch && <p className="error">{errors.branch.message}</p>}
          </label>
          <label>
            Semester:
            <input type="number" min="1" max="8" {...register('semester')} />
            {errors.semester && <p className="error">{errors.semester.message}</p>}
          </label>
          <label>
            Photo:
            <input type="file" accept="image/*" {...register('photo')} />
            {errors.photo && <p className="error">{errors.photo.message}</p>}
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
