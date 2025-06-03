import React, { useEffect, useRef, useState } from 'react';
import './StudentProfilePopup.css';
import axios from 'axios';

const StudentProfilePopup = ({ student, onClose }) => {
  const [editable, setEditable] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({ ...student });
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const fileInputRef = useRef(null);

  if (!student) return null;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains('popup-overlay')) {
        onClose();
      }
    };

    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/students/${student.student_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUpdatedStudent(response.data);
      } catch (error) {
        console.error('Error fetching student by ID:', error);
      }
    };

    if (student?.student_id) {
      fetchStudent();
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [student, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImagePreview(imageUrl);
    }
  };

  const handleUpdateClick = async () => {
    if (editable) {
      try {
        const formData = new FormData();
        formData.append('name', updatedStudent.name);
        formData.append('branch', updatedStudent.branch);
        formData.append('email', updatedStudent.email);
        formData.append('dob', updatedStudent.dob);
        formData.append('semester', updatedStudent.semester);
        if (selectedImageFile) {
          formData.append('photo', selectedImageFile);
        }

        const token = localStorage.getItem('token');
        await axios.patch(
          `http://localhost:3000/students/${student.student_id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setMessage({ type: 'success', text: 'Student updated successfully!' });
      } catch (error) {
        console.error('Error updating student:', error);
        setMessage({ type: 'error', text: 'Failed to update student.' });
      }
    }
    setEditable(!editable);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/students/${student.student_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({ type: 'success', text: 'Student deleted successfully!' });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error deleting student:', error);
      setMessage({ type: 'error', text: 'Failed to delete student.' });
    }
  };

  const renderInput = (type, name, value) => (
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      className="custom-input"
    />
  );

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-left">
          <img
            src={
              profileImagePreview
                ? profileImagePreview
                : updatedStudent.photo
                ? `http://localhost:3000${updatedStudent.photo}`
                : ''
            }
            alt="student"
            className={`student-photo ${editable ? 'editable-photo' : ''}`}
            onClick={handleImageClick}
          />
          {editable && (
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          )}
          <h2 className="student-name">
            {editable ? renderInput('text', 'name', updatedStudent.name) : updatedStudent.name}
          </h2>
          <p className="student-role">
            {editable ? renderInput('text', 'branch', updatedStudent.branch) : updatedStudent.branch}
          </p>
        </div>

        <div className="popup-right">
          <button className="close-button" onClick={onClose}>×</button>
          <h3>Student Information</h3>

          <div className="info-row">
            <span className="label">Email:</span>
            {editable ? renderInput('email', 'email', updatedStudent.email) : (
              <span>{updatedStudent.email}</span>
            )}
          </div>

          <div className="info-row">
            <span className="label">DOB:</span>
            {editable ? renderInput('date', 'dob', updatedStudent.dob?.slice(0, 10)) : (
              <span>{updatedStudent.dob?.slice(0, 10)}</span>
            )}
          </div>

          <div className="info-row">
            <span className="label">Semester:</span>
            {editable ? renderInput('number', 'semester', updatedStudent.semester) : (
              <span>{updatedStudent.semester}</span>
            )}
          </div>

          <div className="popup-actions">
            
            {!showConfirmDelete && (
              <button onClick={handleUpdateClick}>
                {editable ? 'Save' : 'Update'}
              </button>
            )}

            {!showConfirmDelete ? (
              <button onClick={() => setShowConfirmDelete(true)} className="delete-btn">
                Delete
              </button>
            ) : (
              <div className="confirm-delete">
                <span className="confirm-text">Are you sure?</span>
                <div className="confirm-buttons">
                  <button className="confirm yes" onClick={handleDeleteConfirm}>Yes</button>
                  <button className="confirm no" onClick={() => setShowConfirmDelete(false)}>No</button>
                </div>
              </div>
            )}
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePopup;
