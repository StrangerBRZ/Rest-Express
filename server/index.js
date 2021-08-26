// Express server setup
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const taskRouter = require('./routes/task-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../client/build')));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.json({ message: "Hello from server!" })
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.use('/api', taskRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))