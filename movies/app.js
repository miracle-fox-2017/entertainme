const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/entertainme', {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const movies = require('./routes/movies')

app.use('/', movies)

app.listen(3001, () => {
  console.log('Listening on port 3001...')
})