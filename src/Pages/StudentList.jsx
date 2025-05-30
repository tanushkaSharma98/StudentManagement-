import React, { useState } from 'react';
import './StudentList.css';
import List from '../components/List/List';
import FilterComponent from '../components/FilterComponent/FilterComponent';
import StudentProfilePopup from '../components/StudentProfilePopup/StudentProfilePopup';

const dummyStudents = [
  { name: 'Amit Kumar', email: 'amit@gm.com', dob: '2000-05-21', branch: 'Computer Science', semester: '6' },
  { name: 'Priya Sharma', email: 'priya@gm.com', dob: '2001-08-15', branch: 'Electrical Engineering', semester: '4' },
  { name: 'Raj Patel', email: 'raj@gm.com', dob: '2002-12-10', branch: 'Mechanical Engineering', semester: '6' },
];

const StudentList = () => {
  const [semesterFilter, setSemesterFilter] = useState('');
  const [branchSearch, setBranchSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = dummyStudents.filter(student => {
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
