const express       = require('express')
const mongoose      = require('mongoose')
const morgan        = require('morgan')
const bodyParser    = require('body-parser')

const AssistantRoute = require('./routes/assistant')
mongoose.connect('mongodb://127.0.0.1:27017/node-upload')
const db = mongoose.connection

db.on('error', err =>{
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established')
})

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/', AssistantRoute)