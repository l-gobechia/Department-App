const User = require('../models/user.model');
const bcrypt = require('bcrypt');


// const registerUser = async (userEmail, userPassword) => {
//     const user = new User({
//         userEmail: userEmail.trim(),
//         userPassword,
//     });

//     try {
//         // const hash = await bcrypt.hash(userPassword, 10);
//         // user.userPassword = hash;
//         return await user.save();
//     } catch (err) {
//         if (err.code == 11000) {
//             throw { 
//                 description: 'This User email already exists',
//                 statusCode: 409,
//             }
//         }
//         throw err;
//     }
// };

const registerUser = async (username, password) => {
    const user = new User({
        username: username.trim(),
        password,
    });

    try {
        // const hash = await bcrypt.hash(userPassword, 10);
        // user.userPassword = hash;
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
    try {
        return await User.find();
    } catch (err) {
        throw err;
    }
    
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
