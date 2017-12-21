const Movie = require('../models/movies')

const getAllMovies = (req, res) => {
  Movie.find()
  .then(movies => {
    res.status(200).send({
      status: "OK",
      movies
    })
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const postMovies = (req, res) => {
  let movie = new Movie ({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    status: req.body.status,
    popularity: req.body.popularity,
    tag: req.body.tag
  })
  movie.save()
  .then(newMovie => {
    res.status(200).send({
      status: "New Movie",
      newMovie
    })
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  getAllMovies,
  postMovies
};