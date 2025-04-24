const db = require('../models');
const Employee = db.Employee;

// Get all employees
exports.findAll = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while retrieving employees."
    });
  }
};

// Get employee by ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({
        message: `Employee with id ${id} not found.`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving Employee with id ${id}`
    });
  }
};

// Create a new employee
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    return res.status(400).json({
      message: "First name, last name, and email are required!"
    });
  }

  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while creating the Employee."
    });
  }
};

// Update an employee
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Employee.update(req.body, {
      where: { id: id }
    });
    
    if (num == 1) {
      res.status(200).json({
        message: "Employee was updated successfully."
      });
    } else {
      res.status(404).json({
        message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error updating Employee with id=${id}`
    });
  }
};

// Delete an employee
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Employee.destroy({
      where: { id: id }
    });
    
    if (num == 1) {
      res.status(200).json({
        message: "Employee was deleted successfully!"
      });
    } else {
      res.status(404).json({
        message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Could not delete Employee with id=${id}`
    });
  }
};