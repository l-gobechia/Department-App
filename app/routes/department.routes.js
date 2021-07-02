const express = require('express');
const router = express.Router();
const department = require('../controllers/department.controller');

// Create a new Department
router.post('/department', async (req, res) => {

    const { depName, depDescription } = req.body;
    const result = await department.createDepartment(depName, depDescription);
    res.status(200).send({ result });

});

// Retrive all Departments
router.get('/department', async (req, res) => {
    const depList = await department.getDepartments();
   
    res.status(200).send({ result: depList })
});

// Retrive a single department
// router.get('/department/:depID', department.findDepartment);

// Delete a department with ID
router.delete('/department/:depID', async (req, res) => {
   
});

module.exports = router;