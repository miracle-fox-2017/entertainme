const Movies = require('../models/moviesModel')
const axios = require('axios')
const redis = require('redis')
const client = redis.createClient()

const createMovie = (req, res) => {
  Movies.create({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag
  })
    .then((dataMovie) => {
      fetchAPI(dataMovie)
      res.send(dataMovie)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const fetchAPI = (dataMovie) => {
  axios.get('http://localhost:3000/')
    .then((result) => {
      result.data.movies.push(dataMovie)
      client.setex('alldata', 30, JSON.stringify(result.data))
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const getDataMovie = (req, res) => {
  Movies.find()
    .then((dataMovies) => {
      res.send(dataMovies)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const deleteDataMovie = (req, res) => {
  Movies.findByIdAndRemove(req.params.id)
    .then((dataMovie) => {
      res.send(dataMovie)
    })
    .catch((reason) => {
      res.send(reason)
    })
}
module.exports = {
  createMovie,
  getDataMovie,
  deleteDataMovie
}