const TV = require('../models/tvModel')

const createSeries = (req, res) => {
  TV.create({
    name: req.body.title,
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

const getDataSeries = (req, res) => {
  TV.find()
    .then((dataMovies) => {
      res.send(dataMovies)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

module.exports = {
  createSeries,
  getDataSeries
}