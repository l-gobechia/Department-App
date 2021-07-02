const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
    departmentName: String,
    departmentDescription: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Department', DepartmentSchema);
