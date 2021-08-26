// Express server setup
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const taskRouter = require('./routes/task-router')

const app = express()
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send( "Hello from server!" )
})

app.use('/api', taskRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${ PORT }`);
});