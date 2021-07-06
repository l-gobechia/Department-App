const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    departmentID: String,
    employeeName: String,
    employeeEmail: { type: String, unique: true, },
    employeeAge: Number,
    employeePosition: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
