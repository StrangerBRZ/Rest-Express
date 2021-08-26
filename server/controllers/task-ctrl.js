// Main app controller
var ObjectId = require('mongodb').ObjectId; 

const Task = require('../models/task-model')

// create new tasks
createTask = (req, res) => {
    const body = req.body
    if (!body) { // check if user input is empty
        return res.status(400).json({
            success: false,
            error: 'You must provide a task',
        })
    }

    const task = new Task(body)

    if (!task) {
        return res.status(400).json({ success: false, error: err })
    }

    task
        .save() // save task to db
        .then(() => {
            return res.status(201).json({
                success: true,
                id: Task._id,
                message: 'Task created!',
            })
        })
        .catch(error => { // catch potential errors
            return res.status(400).json({
                error,
                message: 'Task not created!',
            })
        })
}

// Update task status between done and to-do
updateTask = async (req, res) => {
    const body = req.body

    if (!body) { // check request input
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Task.findOne({ _id: body._id }, (err, task) => {
        if (err) { // check if task is not found or threw errors
            return res.status(404).json({
                err,
                message: 'Task not found!',
            })
        }
        task.status = body.status
        task
            .save() // update task status to db
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: Task._id,
                    message: 'Task updated!',
                })
            })
            .catch(error => { // catch potential errors
                return res.status(404).json({
                    error,
                    message: 'Task not updated!',
                })
            })
    })
}

// Delete all tasks
deleteAllTasks = async (req, res) => {
    await Task.deleteMany({}, (err) => { // delete all documents from db
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: {} })
    }).catch(err => console.log(err))
}

// Delete single task
deleteTask = async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!task) {
            return res
                .status(404)
                .json({ success: false, error: `Task not found` })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}

// find all tasks
getAllTasks = async (req, res) => {
    await Task.find({}, (err, tasks) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!tasks.length) {
            return res
                .status(404)
                .json({ success: false, error: `Task not found` })
        }
        return res.status(200).json({ success: true, data: tasks })
    }).catch(err => console.log(err))
}

module.exports = {
    createTask,
    updateTask,
    deleteAllTasks,
    deleteTask,
    getAllTasks,
}
