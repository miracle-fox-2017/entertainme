const app = require('express')()
const Entertain = require('./routers/entertain')
const responseTime = require('response-time')

app.use(responseTime())

app.use('/', Entertain)

app.listen(3000)
