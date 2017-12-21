const app      = require('express')()
const logger   = require('morgan')
const responseTime = require('response-time')
const Orchestrator = require('./routers')
const bodyParser = require('body-parser')

app.use(logger('dev'))
app.use(responseTime())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', Orchestrator )

app.listen(3000)
