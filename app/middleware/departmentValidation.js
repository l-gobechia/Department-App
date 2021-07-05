const departmentValidation = (req, res, next) => {

    const { depName } = req.body;

    // checks for all white spaces
    if (depName && depName.trim().length) {
        next();
    } else {
        res.status(400).send( {error: 'Department name is required'} );
    }

};

module.exports = {
    departmentValidation,
};
