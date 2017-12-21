const app = require('express')()
const Movie = require('./routers/movie')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/movie', Movie)

app.listen(3001)
