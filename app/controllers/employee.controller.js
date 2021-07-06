const EmployeeModel = require('../models/employee.model');

const createEmployee = async (employeeData) => {

    const {
        departmentID,
        employeeName,
        employeeEmail,
        employeeAge,
        employeePosition,
    } = employeeData;

    const newEmployee = new EmployeeModel({
        departmentID,
        employeeName,
        employeeEmail,
        employeeAge,
        employeePosition,  
    });

    try {
        return await newEmployee.save();
    } catch(err) {
        throw err;
    }
};

const getEmploye = async (departmentID) => {

    try {
        return await EmployeeModel.find( departmentID );
    } catch (err) {
        throw err;
    }

};

const deleteEmployee = async (id) => {
    
    try {
        return await EmployeeModel.findByIdAndRemove(id);
    } catch(err) {
        throw err;
    }

};

module.exports = {
    createEmployee,
    getEmploye,
    deleteEmployee,
};
