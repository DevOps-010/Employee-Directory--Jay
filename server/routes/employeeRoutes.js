const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Get all employees
router.get('/', employeeController.findAll);

// Get employee by ID
router.get('/:id', employeeController.findOne);

// Create a new employee
router.post('/', employeeController.create);

// Update an employee
router.put('/:id', employeeController.update);

// Delete an employee
router.delete('/:id', employeeController.delete);

module.exports = router;