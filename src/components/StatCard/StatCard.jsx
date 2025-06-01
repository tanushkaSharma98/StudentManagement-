import React, { useEffect, useState } from 'react';
import './StatCard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StatCard = ({ title, value: initialValue, icon, color, showArrow }) => {
  const navigate = useNavigate();
  const [studentCount, setStudentCount] = useState(initialValue);

  useEffect(() => {
    const fetchStudentCount = async () => {
      if (title === 'Total Students') {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:3000/students', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setStudentCount(response.data.length); 
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      }
    };

    fetchStudentCount();
  }, [title]);

  const handleViewClick = () => {
    if (title === 'Total Students') {
      navigate('/students');
    }
  };

  return (
    <div className="stat-card" style={{ backgroundColor: color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p>{studentCount}</p>
      </div>
      {showArrow && (
        <div className="stat-arrow" onClick={handleViewClick} style={{ cursor: 'pointer' }}>
          <span className="arrow-icon">→</span>
          <span className="arrow-text">View</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
