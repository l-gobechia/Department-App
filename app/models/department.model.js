const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
    departmentName: {type: String, unique: true, },
    departmentDescription: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Department', DepartmentSchema);
