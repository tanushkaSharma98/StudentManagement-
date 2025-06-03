import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/SideBar';
import TopBar from '../components/Topbar/TopBar';
import StatCard from '../components/StatCard/StatCard';
import StatsChart from '../components/StatsChart/StatsChart';
import AddStudent from '../components/AddStudent/AddStudent';

import './DashboardPage.css';

const DashboardPage = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);

  const handleAddStudent = (studentData) => {
    console.log('New Student Data:', studentData);
    
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <TopBar onAddStudent={() => setShowAddPopup(true)} />

        <div className="card-grid">
          <StatCard title="Total Students" value="N/A" color="#4A90E2" showArrow={true} />
          <StatCard title="Branches" value="12"  color="#7B61FF" />
          <StatCard title="Semesters" value="8"  color="#F5A623" />
        </div>

        <StatsChart />

        {showAddPopup && (
          <AddStudent
            onClose={() => setShowAddPopup(false)}
            onSubmit={handleAddStudent}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
