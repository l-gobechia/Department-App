const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

// const UserSchema = mongoose.Schema({
//     userEmail: { type: String, unique: true, },
//     userPassword: String,
// }, {
//     timestamps: true,
// });

const UserSchema = mongoose.Schema({
    username: { type: String, unique: true, },
    password: String,
}, {
    timestamps: true,
});

UserSchema.methods.validPassword = (password) => {
    console.log(` @@@@@@@@@@ in validpass func ${password} and this.pass ${this.password}`);
    return this.password = password;
}

// UserSchema.pre(
//     'save',
//     async (next) => {
//         console.log('next :>> ', next);
//         console.log(JSON.stringify(this) + ' @@@@@@@@@@');
//         const hash = await bcrypt.hash(this.userPassword, 10);

//         this.userPassword = hash;
//         next();
//     }
// )

// UserSchema.methods.isValidPassword = async function(password) {
//     const user = this;
//     const compare = await bcrypt.compare(password, user.password);
//     console.log('compare :>> ', compare);
//     return compare;
//   }

module.exports = mongoose.model('user', UserSchema);
