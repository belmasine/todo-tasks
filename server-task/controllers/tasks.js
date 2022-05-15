const Task = require('../models/Task');
const asyncWrap = require('../middleware/async');

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

const getTask = asyncWrap(async(req,res) => {
    const _id = req.params.id;
    const task = await Task.findOne({ _id }).exec();
    if (!task) {
        return res.status(404).json({ msg: `Id ${_id} not found` });
    }
    res.status(200).json({task}); 
})

const updateTask = asyncWrap(async (req,res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body);
  if (!task) {
    return  res.status(404).json({msg: `Id  ${taskId} not found`});
  }
  res.status(200).json(task);
});

const deleteTask = asyncWrap(async (req,res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId }).exec();
  if (!task) {
      return  res.status(404).json({msg: `Id  ${taskId} not found`});
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
