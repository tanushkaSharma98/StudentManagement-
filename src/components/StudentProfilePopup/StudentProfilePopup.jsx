import React, { useEffect, useRef, useState } from 'react';
import './StudentProfilePopup.css';
import axios from 'axios';

const StudentProfilePopup = ({ student, onClose }) => {
  const [editable, setEditable] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({ ...student });
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
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
        alert('Student updated successfully!');
      } catch (error) {
        console.error('Error updating student:', error);
        alert('Failed to update student.');
      }
    }
    setEditable(!editable);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/students/${student.student_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Student deleted successfully!');
      onClose();
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student.');
    }
  };

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
            {editable ? (
              <input
                type="text"
                name="name"
                value={updatedStudent.name}
                onChange={handleChange}
                className="editable-input"
              />
            ) : (
              updatedStudent.name
            )}
          </h2>
          <p className="student-role">
            {editable ? (
              <input
                type="text"
                name="branch"
                value={updatedStudent.branch}
                onChange={handleChange}
                className="editable-input"
              />
            ) : (
              updatedStudent.branch
            )}
          </p>
        </div>

        <div className="popup-right">
          <h3>Student Information</h3>

          <div className="info-row">
            <span className="label">Email:</span>
            {editable ? (
              <input
                type="email"
                name="email"
                value={updatedStudent.email}
                onChange={handleChange}
              />
            ) : (
              <span>{updatedStudent.email}</span>
            )}
          </div>

          <div className="info-row">
            <span className="label">DOB:</span>
            {editable ? (
              <input
                type="date"
                name="dob"
                value={updatedStudent.dob?.slice(0, 10)}
                onChange={handleChange}
              />
            ) : (
              <span>{updatedStudent.dob?.slice(0, 10)}</span>
            )}
          </div>

          <div className="info-row">
            <span className="label">Semester:</span>
            {editable ? (
              <input
                type="number"
                name="semester"
                value={updatedStudent.semester}
                onChange={handleChange}
              />
            ) : (
              <span>{updatedStudent.semester}</span>
            )}
          </div>

          <div className="popup-actions">
            <button onClick={handleUpdateClick}>
              {editable ? 'Save' : 'Update'}
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Delete 
            </button>
            {/* <button onClick={onClose} className="close-btn">
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePopup;
