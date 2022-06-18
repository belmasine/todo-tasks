export class TaskError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const taskError = (message: string, statusCode: number) => {
    return new TaskError(message, statusCode);
}

