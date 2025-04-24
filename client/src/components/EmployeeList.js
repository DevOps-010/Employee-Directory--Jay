import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

function EmployeeList({ onEditEmployee, searchTerm }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchEmployees(); // Refresh the list
      } catch (err) {
        setError('Failed to delete employee');
        console.error('Error deleting employee:', err);
      }
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    return (
      employee.firstName.toLowerCase().includes(term) ||
      employee.lastName.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.position.toLowerCase().includes(term) ||
      employee.department.toLowerCase().includes(term)
    );
  });

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="employee-table-container">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Hire Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                {searchTerm ? 'No employees match your search' : 'No employees found'}
              </td>
            </tr>
          ) : (
            filteredEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => onEditEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;