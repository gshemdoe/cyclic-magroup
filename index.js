const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const getRoutes = require('./routes/get')

// middlewares
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(getRoutes)


app.listen(process.env.PORT || 3000, () => console.log('Listen to port 3000'))