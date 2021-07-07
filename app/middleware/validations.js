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

module.exports = {
    departmentValidation,
    employeeValidation,
};
