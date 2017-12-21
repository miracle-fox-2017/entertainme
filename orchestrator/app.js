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
      res.send(JSON.parse(data))
    } else {
      next()
    }
  })
}

const responds = (data) => {
  console.log('is there data?');
  return JSON.stringify(data)
}

// belum ke solve
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

const ccc =(req, res, next) => {
  client.get('eternal', function (err, data){
    if (err) throw err
    if (data !== null) {
      res.sen(JSON.parse(data))
    } else {
      next()
    }
  })
}


  const getMovies = () => axios.get('http://localhost:3001/movies')
  const getSeries = () => axios.get('http://localhost:3002/series')

  const entertainMe = async (req, res) => {
    try {
      const Movie = await getMovies()
      const Serie = await getSeries()
      client.setex('eternal', 30, JSON.stringify({ movie: Movie.data.movies, serie: Serie.data.series}))
      res.send({
        movie: Movie.data.movies,
        serie: Serie.data.series
      })
    }
    catch (err) {
      res.send(err)
    }
  } 



app.get('/orchestra', ccc, entertainMe)
app.get('/hiburan', cache, getMoviesSeries)
app.get('/', (req, res) => {
  res.send('Hello Yon')
})

app.listen(3000, ()=> console.log('Using port 3000'))