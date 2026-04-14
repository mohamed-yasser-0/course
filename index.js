require('dotenv').config();

const express = require('express')
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose')

const daysRouter = require('./routes/days.route.js')
const usersRouter = require('./routes/users.route.js')

const dns = require('dns');
dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8"]);

const app = express()
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
const url = process.env.MONGODB_URL
mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
console.error('❌ فشل الاتصال بـ MongoDB Atlas:');
        console.error(err.message);    });
app.use('/api/days', daysRouter)
app.use('/api/users', usersRouter)

app.use((req, res, next) => {
    res.json({ status: 'ERROR', message: 'this resource not found' }) 
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || 'ERROR',
        message: error.message || 'Something went wrong'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});