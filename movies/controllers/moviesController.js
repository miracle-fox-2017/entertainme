const Movies = require('../models/moviesModel')

const createMovie = (req, res) => {
  Movies.create({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag
  })
    .then((dataMovie) => {
      res.send(dataMovie)
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

module.exports = {
  createMovie,
  getDataMovie
}