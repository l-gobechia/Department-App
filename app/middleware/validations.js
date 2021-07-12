const departmentValidation = (req, res, next) => {

    const { depName } = req.body;

    // checks for all white spaces
    if (depName && depName.trim().length) {
        next();
    } else {
        res.status(400).send( {error: 'Department name is required'} );
    }

};


const employeeValidation = (req, res, next) => {
    
    const {employeeName, employeeEmail, employeeAge, employeePosition} = req.body;

    // checks if all variables are not empty and they dont contain whitespaces
    if ( employeeName && employeeName.trim().length && 
         employeeEmail && employeeEmail.trim().length &&
         employeeAge && employeeAge != NaN &&
         employeePosition && employeePosition.trim().length ) {
        
            let myNumberRegex = new RegExp(/[0-9]/g);
            // checks if employeAge is number or not
            let matchRegex = myNumberRegex.test(employeeAge);

            if (matchRegex) {
                next();
            } else {
                res.status(400).send( {error: 'Age Must Be a number'} );
            };
            
    } else {
        res.status(400).send( {error: 'Please Fill out all the fields. Age must be a Number'} );
    };

};

const userEmailAndPasswordValidation = (req, res, next) => {

    const email = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (req.body.userPassword.match(pass) && req.body.userEmail.match(email)) {
        next();
    } else if (req.body.userEmail.match(email) === null) {
        res.status(403).send( {error: 'Don\'t use empty space in email'} );
    } else {
         res.status(403).send( {error: 'Password must contain 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'} );
    }

};

module.exports = {
    departmentValidation,
    employeeValidation,
    userEmailAndPasswordValidation,
};
