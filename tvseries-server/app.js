const app      = require('express')()
const mongoose = require('mongoose')
const logger   = require('morgan')
const bodyParser = require('body-parser')
const TvSeries = require('./routers')

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/tvseries', TvSeries)

mongoose.connect('mongodb://AhmadNizar:cBnmgEXaknFbpUNN@ahmadnizardb-shard-00-00-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-01-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-02-scdlc.mongodb.net:27017/dbTVSeries?ssl=true&replicaSet=AhmadNizarDB-shard-0&authSource=admin', (err) => {
  if(!err) {
    console.log('DATABASE TERHUBUNG');
  } else {
    console.log('TIDAK TERHUBUNG DATABASE');
  }
})

app.get('/', (req, res) => {
  res.send({
    status: 'jalan tong'
  })
})

app.listen(3002)
