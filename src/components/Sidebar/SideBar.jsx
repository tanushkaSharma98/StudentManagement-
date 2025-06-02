import React from 'react';
import './SideBar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Student Management</div>
      <ul className="menu">
        <li className="active">Dashboard</li>
        <li>My Profile</li>
        <li>Settings</li>
        <li>Sign Out</li>
      </ul>
    </div>
  );
};

export default Sidebar;
