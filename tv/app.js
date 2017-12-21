require('dotenv').config()
const app = require('express')()
const mongoose = require('mongoose').connect(process.env.DB)
const bodyParser = require('body-parser')
const Tv = require('./routers/tv')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/tv', Tv)

app.listen(3002)
