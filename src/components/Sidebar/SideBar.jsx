import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SideBar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/logout', {  
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSigningOut(true);
        localStorage.removeItem('token');

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div className="sidebar">
        <div className="logo">Student Management</div>
        <ul className="menu">
          <li className="active">Dashboard</li>
          <li onClick={() => navigate('/students')} style={{ cursor: 'pointer' }}>Students</li>
          {/* <li>My Profile</li> */}
          <li>Settings</li>
          <li style={{ cursor: 'pointer' }} onClick={handleSignOut}>Sign Out</li>
        </ul>
      </div>
      {signingOut && <div className="signing-out-msg">Signing out...</div>}
    </>
  );
};

export default Sidebar;
