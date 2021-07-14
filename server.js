const express = require('express');
const bodyParser = require('body-parser');
require('./passport');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors())

// passportjs

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json( {"message": "Welcome To Department App"} );
});

// Require Notes routes
const department = require('./app/routes/department.routes');
const employee = require('./app/routes/employee.routes');
const auth = require('./app/routes/auth.routes');
// const user = require('./app/routes/user.route');
const passport = require('passport');
// app.use('/', department, employee);
app.use('/auth', auth);
// app.use('/user', passport.authenticate('jwt', { session: false } ), user);
app.use('/', passport.authenticate('jwt', { session: false } ), department, employee);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
