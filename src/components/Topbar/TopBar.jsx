import React from 'react';
import './TopBar.css';

const TopBar = ({ onAddStudent }) => {
  return (
    <div className="topbar">
      <div>
        <h2>Dashboard</h2>
        <p>Welcome, Admin!</p>
      </div>
      <div className="right">
        {/* <input type="text" placeholder="Search..." /> */}
        <button onClick={onAddStudent}>Add Student</button>
      </div>
    </div>
  );
};

export default TopBar;
