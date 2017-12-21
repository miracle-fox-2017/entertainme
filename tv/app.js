const app = require('express')()
const Tv = require('./routers/tv')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/tv', Tv)

app.listen(3002)
