class TaskError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const taskError = (message, statusCode) => {
    return new TaskError(message, statusCode);
}

module.exports = {taskError, TaskError};
