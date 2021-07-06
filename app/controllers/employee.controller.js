const EmployeeModel = require('../models/employee.model');
const DepartmentModel = require('../models/department.model');
const employeeModel = require('../models/employee.model');

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
        const ifDepartmentExists = await DepartmentModel.findOne( {_id:departmentID } );
        if (!ifDepartmentExists) { 
            throw {
                description: 'Department does not exsits',
                statusCode: 404,
            };
        }
    } catch (error) {
        throw error;
    }

    try {
      return await newEmployee.save();    
    } catch(err) {
        if (err.code === 11000) {
            throw {
                description: 'This employee Email already exists',
                statusCode: 409,
            }
        }
        throw err;
    }

};

const getEmploye = async (departmentID) => {
    const depID = departmentID.departmentID;
    try {
        const ifDepIDExists = await employeeModel.findOne( { departmentID: depID } ); 
        if(!ifDepIDExists){
               throw {
                description: 'Such Department does not exists or it doesn not have employees',
                statusCode: 404
            }
        }
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
