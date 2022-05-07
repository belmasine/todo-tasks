const Task = require('../models/Task');

const getTasks = async(req,res) => {
  const tasks = await Task.find({});
  res.status(200).json({tasks});
}

const postTask = async (req,res) => {
  try {
      const task = await Task.create(req.body);
      res.status(201).json({task});
  } catch (error) {
      res.status(500).json({msg:  error});
  }
}

const getTask = async(req,res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id }).exec();
    if (!task) {
        return res.status(404).json({ msg: `Id ${_id} not found` });
    }
    res.status(200).json({task}); 
  } catch (error) {
      res.status(500).json({ msg: error });
  }  
}

const updateTask = (req,res) => {
  res.send('update task');
}

const deleteTask = async (req,res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskId }).exec();
        if (!task) {
            return  res.status(404).json({msg: `Id  ${taskId} not found`});
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

module.exports = {
    getTasks,
    postTask,
    getTask,
    updateTask,
    deleteTask,
};
