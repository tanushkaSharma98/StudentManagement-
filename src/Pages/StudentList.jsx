import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaArrowLeft } from 'react-icons/fa';   
import './StudentList.css';

import List from '../components/List/List';
import FilterComponent from '../components/FilterComponent/FilterComponent';
import StudentProfilePopup from '../components/StudentProfilePopup/StudentProfilePopup';
import axios from 'axios';

const StudentList = () => {
  const navigate = useNavigate(); 

  const [students, setStudents] = useState([]);
  const [semesterFilter, setSemesterFilter] = useState('');
  const [branchSearch, setBranchSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSemester = semesterFilter ? student.semester === semesterFilter : true;
    const matchesBranch = student.branch.toLowerCase().includes(branchSearch.toLowerCase());
    const matchesName = student.name.toLowerCase().includes(nameSearch.toLowerCase());
    return matchesSemester && matchesBranch && matchesName;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="student-list-page">
      
      <div className="back-button" onClick={() => navigate('/dashboard')}>
        <FaArrowLeft className="back-icon" /> Back to Dashboard
      </div>

      <h2>Student List</h2>

      <FilterComponent 
        semester={semesterFilter}
        branchSearch={branchSearch}
        nameSearch={nameSearch}
        onSemesterChange={setSemesterFilter}
        onBranchSearchChange={setBranchSearch}
        onNameSearchChange={setNameSearch}
      />

      <List 
        students={currentStudents} 
        onStudentClick={setSelectedStudent} 
        startIndex={indexOfFirstStudent} 
      />

      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>

      {selectedStudent && (
        <StudentProfilePopup
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default StudentList;
