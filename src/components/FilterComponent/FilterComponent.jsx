import React from 'react';
import './FilterComponent.css';

const FilterComponent = ({ semester, branchSearch, nameSearch, onSemesterChange, onBranchSearchChange, onNameSearchChange }) => {
  return (
    <div className="filter-container">
      <div className="filter-item">
        <label>Filter by Semester:</label>
        <select value={semester} onChange={(e) => onSemesterChange(e.target.value)}>
          <option value="">All</option>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label>Search by Branch:</label>
        <input 
          type="text" 
          placeholder="Enter branch name" 
          value={branchSearch} 
          onChange={(e) => onBranchSearchChange(e.target.value)} 
        />
      </div>

      <div className="filter-item">
        <label>Search by Name:</label>
        <input 
          type="text" 
          placeholder="Enter student name" 
          value={nameSearch} 
          onChange={(e) => onNameSearchChange(e.target.value)} 
        />
      </div>
    </div>
  );
};

export default FilterComponent;
