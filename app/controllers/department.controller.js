const Department = require('../models/department.model');
const Employee = require('../models/employee.model');

// Create and Save a new Department
const createDepartment = async (name, description) => {

    const dep = new Department({
        departmentName : name,
        departmentDescription : description || 'No Description', 
    });

    try {
        return await dep.save();
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

// Retrieve and return all Departments from the database.
const getDepartments = async () => {
    return await Department.find(); 
};

// Delete a Department  with the specified departmentID in the request
const deleteDepartment = async (departmentID) => {
 
    try {
        const ifDepIDIsEmpty = await Employee.findOne( {  departmentID } );
        if (!ifDepIDIsEmpty) {
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
