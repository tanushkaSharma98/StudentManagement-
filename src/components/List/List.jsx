import React from 'react';
import './List.css';

const List = ({ students, onStudentClick, startIndex = 0 }) => {
  return (
    <div className="list-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Branch</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} onClick={() => onStudentClick(student)} className="clickable-row">
              <td>{startIndex + index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.dob}</td>
              <td>{student.branch}</td>
              <td>{student.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
