const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userEmail: { type: String, unique: true, },
    userPassword: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
