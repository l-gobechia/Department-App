const express = require('express');
const router = express.Router();
const department = require('../controllers/department.controller');
const { departmentValidation } = require('../middleware/departmentValidation');

// Create a new Department
router.post('/department', departmentValidation , async (req, res) => {

    const { depName, depDescription } = req.body;
    try {
        const result = await department.createDepartment(depName, depDescription);
        res.status(201).send( { result } );
    } catch (err) {
        if (err.statusCode && err.description){
            res.status(err.statusCode).send( {errorMesseage : err.description} );
        }
        throw err;
    };


});


// Retrive all Departments
router.get('/department', async (req, res) => {
    const depList = await department.getDepartments();
   
    res.status(200).send( { result: depList } )
});

// Retrive a single department
// router.get('/department/:depID', department.findDepartment);

// Delete a department with ID
router.delete('/department/:depID', async (req, res) => {

   const id = req.params.depID;
   const result = await department.deleteDepartment(id);
   res.status(204).send();

});

module.exports = router;
