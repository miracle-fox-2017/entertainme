//require model
const Movie = require('../models/movieModel')

const getMovie = (req, res) => {
  Movie.find()
  .then(movies => {
    res.send({
      status: "OK",
    	info: "movies found successfully",
      data: movies
    })
  })
  .catch(err => {
    res.send(err)
  })
}

const addMovie = (req, res) => {
  let movie = new Movie(req.body)
  movie.save()
  .then( () => {
    res.status(200).send({
      status: 'OK',
      dataAdded: req.body
    })
  })
  .catch(err => {
    res.status(500).send({
      status: 'error',
      error: err
    })
  })
}

module.exports = {
  getMovie,
  addMovie
};
