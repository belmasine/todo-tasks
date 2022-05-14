const mongoose = require('mongoose');
const { Schema } = mongoose;
const TaskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
    maxlength: [20, 'name cannot exceed 20 characteres !']
  },
  completed: Boolean,
});
const Task = mongoose.model('Task', TaskSchema);
module.exports =  Task;
