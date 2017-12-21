const Movie = require('../models/movieModel')
const mongoose = require('mongoose')


const getMovie = (req,res) => {
  Movie.find({})
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const postMovie = (req,res) => {
  Movie.create({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag,
    status: req.body.status
  })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  getMovie,
  postMovie
}
