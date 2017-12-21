const app = require('express')()
const Movie = require('./routers/movie')

app.use('/movie', Movie)

app.listen(3001)
