const express = require('express');
const auth = require('../controllers/auth.controller');
const router = express.Router();
const { userEmailAndPasswordValidation,  } = require('../middleware/validations');

router.post('/registration', userEmailAndPasswordValidation, async (req, res) => {
    const { userEmail, userPassword } = req.body;
    try {
        const result = await auth.registerUser(userEmail, userPassword);
        res.status(201).send( {result} );
    } catch (err) {
        if (err.statusCode && err.description) {
            res.status(err.statusCode).send( {errorMesseage : err.description} );
        }
        throw err;
    }
});

router.get('/users', async (req, res) => {
    const userList = await auth.getUsers();
    res.status(200).send( {result: userList} );
});


router.delete('/users/:userID', async (req, res) => {
  
    try {
        const { userID } = req.params;
        await auth.deleteUser(userID);
        res.status(204).send()
    } catch (error) {
        throw error;
    }
;
});


module.exports = router;
