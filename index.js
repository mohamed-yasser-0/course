const express = require('express')
const coursesRouter = require('./routes/courses.route.js')
const usersRouter = require('./routes/users.route.js')
const mongoose = require('mongoose')
const dns = require('dns');
const { ERROR } = require('./utils/httpStatusText.js');
const path = require('path');
dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8"]);
const app = express()

app.use('/uploads',express.static(path.join(__dirname, 'uploads')))

app.use(express.json())
require('dotenv').config();
console.log()
const url = process.env.MONGODB_URL
mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB');
})
app.use('/api/courses', coursesRouter)
app.use('/api/users', usersRouter)

app.use((req, res, next) => {
    res.json({ status: 'ERROR', message: 'this resource not found' })
})

app.use((error, req, res, next) => {

    return res.status(error.statusCode||500).json({status:error.statusText||Error, message:error.message||"error"})
})

app.listen(process.env.PORT, () => {
    console.log('listening on port: 5000')
})
