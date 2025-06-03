import React from 'react';
import './FilterComponent.css';

const FilterComponent = ({
  branchSearch,
  nameSearch,
  onBranchSearchChange,
  onNameSearchChange,
}) => {
  return (
    <div className="filter-container">
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
