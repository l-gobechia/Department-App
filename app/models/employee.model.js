const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    employeeName: String,
    employeeEmail: String,
    employeeAge: Number,
    employeePosition: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
