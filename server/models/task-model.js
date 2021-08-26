const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Task = new Schema(
    {
        name: { type: String, required: true },
        status: { type: Boolean, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('tasks', Task)
