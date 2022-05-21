const {TaskError} = require('../errors/task-errors');

function errorHandler (err, req, res, next) {

    if(err instanceof TaskError) {
        res.status(err.statusCode).json(err.message);
    } else {
        res.status(500).json(err);
    }

}

module.exports = errorHandler;
