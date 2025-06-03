import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './StudentList.css';

import List from '../components/List/List';
import FilterComponent from '../components/FilterComponent/FilterComponent';
import StudentProfilePopup from '../components/StudentProfilePopup/StudentProfilePopup';
import axios from 'axios';


function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const StudentList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [branchSearch, setBranchSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const studentsPerPage = 5;

  
  const fetchStudents = async (page = 1, branch = branchSearch, name = nameSearch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/students/filter', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name,
          branch,
        },
      });

      const allFilteredStudents = response.data;

      
      const totalFiltered = allFilteredStudents.length;
      const startIndex = (page - 1) * studentsPerPage;
      const paginatedStudents = allFilteredStudents.slice(startIndex, startIndex + studentsPerPage);

      setStudents(paginatedStudents);
      setTotalPages(Math.ceil(totalFiltered / studentsPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching filtered students:', error);
    }
  };

  
  const debouncedFetchStudents = useCallback(
    debounce((page, branch, name) => {
      fetchStudents(page, branch, name);
    }, 500),
    []
  );

  
  useEffect(() => {
    fetchStudents(1);
  }, []);

  
  useEffect(() => {
    debouncedFetchStudents(1, branchSearch, nameSearch);
  }, [branchSearch, nameSearch, debouncedFetchStudents]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchStudents(currentPage + 1, branchSearch, nameSearch);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      fetchStudents(currentPage - 1, branchSearch, nameSearch);
    }
  };

  return (
    <div className="student-list-page">
      <div className="back-button" onClick={() => navigate('/dashboard')}>
        <FaArrowLeft className="back-icon" /> Back to Dashboard
      </div>

      <h2>Student List</h2>

      <FilterComponent
        branchSearch={branchSearch}
        nameSearch={nameSearch}
        onBranchSearchChange={setBranchSearch}
        onNameSearchChange={setNameSearch}
      />

      <List
        students={students}
        onStudentClick={setSelectedStudent}
        startIndex={(currentPage - 1) * studentsPerPage}
      />

      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {selectedStudent && (
        <StudentProfilePopup student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
};

export default StudentList;
