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
        throw err;
    }

});

router.get('/department/:departmentID/employee', async (req, res) => {

    try {
        const { departmentID } = req.params;
        const employeeList = await employee.getEmploye( {departmentID: departmentID} );
        res.status(200).send( {result: employeeList} );
    } catch(err) {
        throw err;
    }
    
});

router.delete('/employee/:employeeID', async (req, res) => {

    try {
        const { employeeID } = req.params;
        console.log(employeeID + ' @@@@@@@')
        const result = await employee.deleteEmployee(employeeID);
        res.status(204).send();
    } catch(err) {
        throw err;
    }

});

module.exports = router;
