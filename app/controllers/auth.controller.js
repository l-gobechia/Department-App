const User = require('../models/user.model');

const registerUser = async (userEmail, userPassword) => {
    const user = new User({
        userEmail: userEmail.trim(),
        userPassword,
    });

    try {
        return await user.save();
    } catch (err) {
        if (err.code == 11000) {
            throw { 
                description: 'This User email already exists',
                statusCode: 409,
            }
        }
        throw err;
    }
};

const getUsers = async () => {
    return await User.find();
};

const deleteUser = async (userID) => {
    try {
        return await User.findByIdAndRemove(userID);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    registerUser,
    getUsers,
    deleteUser,
};
