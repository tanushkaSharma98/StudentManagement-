import React, { useEffect, useRef, useState } from 'react';
import './StudentProfilePopup.css';

const StudentProfilePopup = ({ student, onClose }) => {
  const [editable, setEditable] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({ ...student });
  const [profileImage, setProfileImage] = useState('https://i.ibb.co/ZYW3VTp/brown-brim.png');
  const fileInputRef = useRef(null);

  if (!student) return null;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains('popup-overlay')) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

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
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleUpdateClick = () => {
    if (editable) {
      console.log('Updated Student:', updatedStudent);
      console.log('Updated Image URL:', profileImage);
    }
    setEditable(!editable);
  };

  const handleDelete = () => {
    console.log('Delete student:', student);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-left">
          <img
            src={profileImage}
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
            <span className="value">
              {editable ? (
                <input
                  type="email"
                  name="email"
                  value={updatedStudent.email}
                  onChange={handleChange}
                  className="editable-input"
                />
              ) : (
                updatedStudent.email
              )}
            </span>
          </div>

          <div className="info-row">
            <span className="label">DOB:</span>
            <span className="value">
              {editable ? (
                <input
                  type="date"
                  name="dob"
                  value={updatedStudent.dob}
                  onChange={handleChange}
                  className="editable-input"
                />
              ) : (
                updatedStudent.dob
              )}
            </span>
          </div>

          <div className="info-row">
            <span className="label">Branch:</span>
            <span className="value">
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
            </span>
          </div>

          <div className="info-row">
            <span className="label">Semester:</span>
            <span className="value">
              {editable ? (
                <input
                  type="text"
                  name="semester"
                  value={updatedStudent.semester}
                  onChange={handleChange}
                  className="editable-input"
                />
              ) : (
                updatedStudent.semester
              )}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button className="close-btn" onClick={handleUpdateClick}>
              {editable ? 'Save' : 'Update'}
            </button>
            <button
              className="close-btn"
              style={{ background: '#ef4444' }}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePopup;
