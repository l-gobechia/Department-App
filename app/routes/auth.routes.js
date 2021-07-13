const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../controllers/auth.controller');
const passport = require("passport");
// const auth = require('../controllers/auth.controller');
const { userEmailAndPasswordValidation,  } = require('../middleware/validations');

router.post('/registration', userEmailAndPasswordValidation, async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const result = await auth.registerUser(username, password, next);
        res.status(201).send( {result} );
    } catch (err) {
        if (err.statusCode && err.description) {
            res.status(err.statusCode).send( {errorMesseage : err.description} );
        }
        console.log(`@@@@@@@@@@@@@@@@here`);
        throw err;
    }
});

router.get('/users', async (req, res) => {
    try {
        const userList = await auth.getUsers();
        res.status(200).send( {result: userList} );
    } catch (err) {
        throw err;
    }
});

router.delete('/users/:userID', async (req, res) => {
    try {
        const { userID } = req.params;
        await auth.deleteUser(userID);
        res.status(204).send()
    } catch (error) {
        throw error;
    };
});

/* POST login. */

router.post('/login', (req, res, next) => {

    passport.authenticate('local',
    (err, user) => {
        if (err) {
            console.log('@@@@@@@@@passport.authenticate', err)
        }
        req.login(user, {session: false}, (err) => {
            if (err || !user) {
                res.send("something goes wrong");
            }
            console.log("here");
            // generate a signed son web token with the contents of user object and return it in the response
            // console.log('user :>> ', user);
            try {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 1),
                    data: JSON.stringify(user)}, 'your_jwt_secret'); 
                // const token = jwt.sign(JSON.stringify(user), 'your_jwt_secret'); 
                return res.json( {token} );
            } catch (err) {
                console.log('@@@@@@@@@jwt.sign' + err);
            }
           
         });

    })(req, res);

});

module.exports = router;
