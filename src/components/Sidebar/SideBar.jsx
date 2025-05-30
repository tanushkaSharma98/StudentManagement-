import React from 'react';
import './SideBar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Student_Management</div>
      <ul className="menu">
        <li className="active">Home</li>
        <li>My Profile</li>
        <li>Settings</li>
        <li>Sign Out</li>
      </ul>
    </div>
  );
};

export default Sidebar;
