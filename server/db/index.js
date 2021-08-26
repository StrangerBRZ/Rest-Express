const mongoose = require('mongoose')

var dotenv = require("dotenv").config('/.env');

// setup mongodb connection
var url = process.env.MONGODB_URI;

mongoose
    .connect(url, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
