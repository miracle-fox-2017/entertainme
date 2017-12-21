const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const axios = require('axios');
const redis = require("redis");
const client = redis.createClient();
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

const cache = (req, res, next) => {
  console.log('set cache');
  client.get('entertain', (err, data) => {
    if (err) {
      console.log('sini gak?');
      throw err
    }
    if (data !== null) {
      console.log('datanya ada gak?')
      res.send(data)
    } else {
      next()
    }
  })
}

const responds = (data) => {
  console.log('is there data?');
  return JSON.stringify(data)
}

const getMoviesSeries = (req, res) => {
  console.log('get All Entertain')
  axios.get('http://localhost:3001/movies')
  .then(dataMovie => {
    axios.get('http://localhost:3002/series')
    .then(dataSeries => {
      let entertain = {
        movies: dataMovie.data,
        series: dataSeries.data
      }
      client.setex('entertain', 30, responds(entertain))
      res.send(entertain)
    })
  })
  .catch(err => {
    res.send(err)
  })
}



app.get('/hiburan', cache, getMoviesSeries)
app.get('/', (req, res) => {
  res.send('Hello Yon')
})

app.listen(3000, ()=> console.log('Using port 3000'))