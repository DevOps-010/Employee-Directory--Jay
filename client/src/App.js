import React, { useState } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import SearchBar from './components/SearchBar';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddClick = () => {
    setCurrentEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setCurrentEmployee(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Employee Directory</h1>
      
      <div className="row mb-4">
        <div className="col">
          <button 
            className="btn btn-primary" 
            onClick={handleAddClick}
          >
            Add Employee
          </button>
        </div>
        <div className="col">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {showForm && (
        <EmployeeForm 
          employee={currentEmployee} 
          onClose={handleFormClose} 
        />
      )}
      
      <EmployeeList 
        onEditEmployee={handleEditEmployee}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default App;