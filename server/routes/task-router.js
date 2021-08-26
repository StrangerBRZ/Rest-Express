const express = require('express')

const TaskCtrl = require('../controllers/task-ctrl')

const router = express.Router()

// app routes
router.post('/task', TaskCtrl.createTask)
router.put('/task/:id', TaskCtrl.updateTask)
router.delete('/tasks', TaskCtrl.deleteAllTasks)
router.delete('/task/:id', TaskCtrl.deleteTask)
router.get('/tasks', TaskCtrl.getAllTasks)

module.exports = router
