const Department = require('../models/department.model');
const employee = require('./employee.controller');

// Create and Save a new Note
const createDepartment = async (name, description) => {

    const dep = new Department({
        departmentName : name,
        departmentDescription : description || 'No Description', 
    });

    try {
        const department = await dep.save();
        return department;
    } catch(err) {
        if (err.code === 11000){
            throw { 
                description: 'This Department name already exists',
                statusCode: 409,
            }
        }
        throw err;
    };

};

// Retrieve and return all notes from the database.
const getDepartments = async () => {
    return await Department.find(); 
};

// Delete a note with the specified noteId in the request
const deleteDepartment = async (departmentID) => {
    
    try {
        const employeeList = await employee.getEmploye( {departmentID: departmentID} );
        if (!employeeList.length) {
            return await Department.findByIdAndRemove(departmentID);
        } else {
            throw {
                description: 'To delete Department there must not be any employees avaiable',
                statusCode: 409,
            };
        }
    } catch(err) {
        throw err;
    }
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartments,
  deleteDepartment,
};
