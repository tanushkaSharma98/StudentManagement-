import React from 'react';
import './StatCard.css';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon, color, showArrow }) => {
  const navigate = useNavigate();

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
        <p>{value}</p>
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
