import React, { useState, useEffect } from 'react';
import './StudentList.css';
import List from '../components/List/List';
import FilterComponent from '../components/FilterComponent/FilterComponent';
import StudentProfilePopup from '../components/StudentProfilePopup/StudentProfilePopup';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [semesterFilter, setSemesterFilter] = useState('');
  const [branchSearch, setBranchSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

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

  return (
    <div className="student-list-page">
      <h2>Student List</h2>
      <FilterComponent 
        semester={semesterFilter}
        branchSearch={branchSearch}
        nameSearch={nameSearch}
        onSemesterChange={setSemesterFilter}
        onBranchSearchChange={setBranchSearch}
        onNameSearchChange={setNameSearch}
      />
      <List students={filteredStudents} onStudentClick={setSelectedStudent} />
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
