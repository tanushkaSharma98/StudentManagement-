import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend,
} from 'recharts';
import './StatsChart.css';
import axios from 'axios';

const StatsChart = () => {
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudentCount(response.data.length);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  const data = [
    {
      name: 'Overview',
      Students: studentCount,
      Branches: 12,
      Semesters: 8,
    }
  ];

  return (
    <div className="chart-container">
      <h2>Statistics Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Students" fill="#4A90E2" />
          <Bar dataKey="Branches" fill="#7B61FF" />
          <Bar dataKey="Semesters" fill="#F5A623" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
