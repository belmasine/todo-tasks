const Task = require('../models/Task');
const asyncWrap = require('../middleware/async');
const { Error } = require('mongoose');
const {taskError} = require('../errors/task-errors')

const getTasks = async(req,res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks});
}

/*const postTask = async (req,res) => {
  try {
      const task = await Task.create(req.body);
      res.status(201).json({task});
  } catch (error) {
      res.status(500).json({msg:  error});
  }
}*/

const postTask = asyncWrap(async (req,res) => {
      const task = await Task.create(req.body);
      res.status(201).json({task});
})

const getTask = asyncWrap(async(req,res, next) => {
    const _id = req.params.id;
    const task = await Task.findOne({ _id }).exec();
    if (!task) {
        /*const error = new Error();
        error.message = 'Task not found';
        error.status = 404;
        return next(error);*/

        return next(taskError('Task not found', 404));
    }
    res.status(200).json({task}); 
})

const updateTask = asyncWrap(async (req,res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body);
  if (!task) {
    const error = new Error();
    error.message = 'Task not found';
    error.status = 404;
    return next(error);
  }
  res.status(200).json(task);
});

const deleteTask = asyncWrap(async (req,res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId }).exec();
  if (!task) {
    const error = new Error();
    error.message = 'Task not found';
    error.status = 404;
    return next(error);
}
  res.status(200).json(task);
})

module.exports = {
    getTasks,
    postTask,
    getTask,
    updateTask,
    deleteTask,
};
