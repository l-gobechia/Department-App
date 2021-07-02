const Department = require('../models/department.model');

// Create and Save a new Note
const createDepartment = async (name, description) => {
    console.log(name + ' ------ ' + ' description ' + description)
    const dep = new Department({
        departmentName : name,
        departmentDescription : description 
    });

    console.log(dep);

    try {
        const department = await dep.save();
        return dep;
    } catch(err) {
        throw err;
    }

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
const deleteDepartment = async (id) => {
    const dep = await Department.findByIdAndRemove(id);
    return dep;
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartments,
  deleteDepartment,
};
