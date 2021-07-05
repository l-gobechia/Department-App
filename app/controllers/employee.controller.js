const EmployeeModel = require('../models/employee.model');

const createEmployee = async (employeeData) => {

    const {
        departmentID,
        employeeName,
        employeeEmail,
        employeeAge,
        employeePosition
    } = employeeData;

    const newEmployee = new EmployeeModel({
        departmentID: departmentID,
        employeeName: employeeName,
        employeeEmail: employeeEmail || `${empName} does not have email`,
        employeeAge: employeeAge,
        employeePosition: employeePosition,  
    });

    try {
        const employee = await newEmployee.save();
        return employee;
    } catch(err) {
        throw err;
    }
};

const getEmploye = async (departmentID) => {
    const employeeList = await EmployeeModel.find( departmentID );
    return employeeList;
};

const deleteEmployee = async (id) => {
    
    try {
        const deleteEmploye = await EmployeeModel.findByIdAndRemove(id);
        return deleteEmploye;
    } catch(err) {
        throw err;
    }

};

module.exports = {
    createEmployee,
    getEmploye,
    deleteEmployee,
};
