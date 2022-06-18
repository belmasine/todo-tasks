import { RequestHandler, Request, Response, NextFunction } from "express";

import Task from '../models/Task';
import {asyncWrap} from '../middleware/async'

import { taskError } from "../errors/task-errors";

const getTasks: RequestHandler = async(req,res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks});
}

const postTask = asyncWrap(async (req: Request,res: Response) => {
      const task = await Task.create(req.body);
      res.status(201).json({task});
})

const getTask = asyncWrap(async(req: Request,res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const task = await Task.findOne({ _id }).exec();
    if (!task) {
        return next(taskError('Task not found', 404));
    }
    res.status(200).json({task}); 
})

const updateTask = asyncWrap(async (req: Request,res: Response, next: NextFunction) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body);
  if (!task) {
    return next(taskError('Task not found', 404));
  }
  res.status(200).json(task);
});

const deleteTask = asyncWrap(async (req: Request,res: Response, next: NextFunction) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId }).exec();
  if (!task) {
    return next(taskError('Task not found', 404));
  }
  res.status(200).json(task);
})

export {
    getTasks,
    postTask,
    getTask,
    updateTask,
    deleteTask,
};
