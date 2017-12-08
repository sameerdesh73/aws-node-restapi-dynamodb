var exports = module.exports = {};

const HttpStatusCode = require('http-status-codes');

exports.create = function(req, res, next){
    //throw new Error('sameer try error');

    req.checkBody("taskname", "taskname is required").exists();
    req.checkBody("taskname", "taskname must be between 2 and 20 characters").isLength({min:2, max:20});

    var errors = req.validationErrors();
    if (errors) {
        res.status(HttpStatusCode.BAD_REQUEST).send(errors);
        return;
    } 
    
    next();
};

exports.update = function(req, res, next){
};