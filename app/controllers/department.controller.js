const Department = require('../models/department.model');

// Create and Save a new Note
const createDepartment = (name, description) => {

    const dep = new Department({
        departmentName : name || 'saxeli',
        departmentDescription : description 
    });

    return dep;
    
};

// Retrieve and return all notes from the database.
const getDepartments = async () => {
    const departmentList = await Department.find(); 
    return departmentList;
};

// Find a single note with a noteId
const findDepartment = (req, res) => {

};


// Delete a note with the specified noteId in the request
const deleteDepartment = (req, res) => {

};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartments,
  deleteDepartment,
};
