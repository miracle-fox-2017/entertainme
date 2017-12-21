const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/entertainme', {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const tvseries = require('./routes/tvseries')

app.use('/api', tvseries)

app.listen(3002, () => {
  console.log('Listening on port 3002...')
})