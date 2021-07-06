const express = require('express');
const router = express.Router();
const employee = require('../controllers/employee.controller');
const { employeeValidation } = require('../middleware/validations');

// Create a new Employee
router.post('/employee', employeeValidation, async (req, res) => {

    try {
        const result = await employee.createEmployee(req.body);
        res.status(201).send( {result} );
    } catch(err) {
        if (err.statusCode && err.description) {
            res.status(err.statusCode).send( {errorMesseage : err.description } );
        }
        res.status(err.statusCode).send( {errorMesseage : err.description } );
    }

});

// Retrives new employee from specific department
router.get('/department/:departmentID/employee', async (req, res) => {

    try {
        const { departmentID } = req.params;
        const employeeList = await employee.getEmploye( {departmentID} );
        res.status(200).send( {result: employeeList} );
    } catch(err) {
        res.status(err.statusCode).send( {errorMesseage : err.description } );
    }
    
});

// Deletes employe with specific employee id
router.delete('/employee/:employeeID', async (req, res) => {
    try {
        const { employeeID } = req.params;
        await employee.deleteEmployee(employeeID);
        res.status(204).send();
    } catch(err) {
        throw err;
    }

});

module.exports = router;
