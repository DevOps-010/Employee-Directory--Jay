import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

function EmployeeForm({ employee, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    hireDate: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If employee prop exists, we're in edit mode
  const isEditMode = !!employee;

  useEffect(() => {
    if (employee) {
      // Format the date for the input field
      const formattedDate = employee.hireDate ? employee.hireDate.split('T')[0] : '';
      
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        position: employee.position || '',
        department: employee.department || '',
        hireDate: formattedDate
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.hireDate) newErrors.hireDate = 'Hire date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        if (isEditMode) {
          await axios.put(`${API_URL}/${employee.id}`, formData);
        } else {
          await axios.post(API_URL, formData);
        }
        
        // Close form and refresh employee list (parent component will handle this)
        onClose();
        window.location.reload(); // Simple refresh to update the list
      } catch (error) {
        console.error('Error saving employee:', error);
        setErrors({ form: 'Failed to save employee. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="employee-form mb-4">
      <h3>{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h3>
      
      {errors.form && (
        <div className="alert alert-danger">{errors.form}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>
          
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="position" className="form-label">Position</label>
            <input
              type="text"
              className={`form-control ${errors.position ? 'is-invalid' : ''}`}
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
            {errors.position && <div className="invalid-feedback">{errors.position}</div>}
          </div>
          
          <div className="col-md-6 mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input
              type="text"
              className={`form-control ${errors.department ? 'is-invalid' : ''}`}
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
            {errors.department && <div className="invalid-feedback">{errors.department}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="hireDate" className="form-label">Hire Date</label>
          <input
            type="date"
            className={`form-control ${errors.hireDate ? 'is-invalid' : ''}`}
            id="hireDate"
            name="hireDate"
            value={formData.hireDate}
            onChange={handleChange}
          />
          {errors.hireDate && <div className="invalid-feedback">{errors.hireDate}</div>}
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Save')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;