module.exports = (app) => {
    const department = require('../controllers/department.controller');

    // Create a new Department
    app.post('/departments', department.create);

    // Retrive all Departments
    app.get('/departments', department.getDepartments);

    // Retrive a single department
    app.get('/departments/:depID', department.findDepartment);

    // Delete a department with ID
    app.delete('/departments/:depID', department.delete);


}