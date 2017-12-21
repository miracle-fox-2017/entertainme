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

const editMovie = async (req, res) => {
  try {
    const findOne = await Movie.findOne({ _id: req.params.id })
    const edit = await Movie.update({ _id: req.params.id }, req.body)
    res.status(200).send({
      status: 'OK',
      last: findOne,
      update: req.body
    })
  } catch (err) {
    res.status(500).send({
      status: 'error cannot update item',
      msg: err
    })
  }
}

const deleteMovie = async (req, res) => {
  try {
    const findOne = await Movie.findOne({ _id: req.params.id })
    const remove = await Movie.remove({ _id: req.params.id })
    res.status(200).send({
      status: 'OK',
      deleted: findOne
    })
  } catch (err) {
    res.status(500).send({
      status: 'error cannot delete item',
      msg: err
    })
  }
}

module.exports = {
  getMovie,
  addMovie,
  editMovie,
  deleteMovie
};
