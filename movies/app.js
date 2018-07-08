require('dotenv').config()
const app = require('express')()
const mongoose = require('mongoose').connect(process.env.DB)
const bodyParser = require('body-parser')
const Movie = require('./routers/movie')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/movie', Movie)

app.listen(3001)
