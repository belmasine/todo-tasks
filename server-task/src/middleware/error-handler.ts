import {TaskError} from '../errors/task-errors';
import { Request, Response, NextFunction } from "express";

export function errorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
    if(err instanceof TaskError) {
        res.status(err.statusCode).json(err.message);
    } else {
        res.status(500).json(err);
    }
}
