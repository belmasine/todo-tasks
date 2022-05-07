const express = require('express');
const router = express.Router();
const {
    getTasks,
    postTask,
    getTask,
    updateTask,
    deleteTask,
} = require('../controllers/tasks');

router.route('/')
    .get(getTasks)
    .post(postTask);

router.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask);

module.exports = router;
