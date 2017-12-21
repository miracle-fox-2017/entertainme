//require model
const Movie = require('../models/movieModel')
const MovieVersion = require('../models/movieVersionModel')

const getMovie = async (req, res) => {
  try {
    const movies = await Movie.find()
    res.send({
      status: "OK",
    	info: "movies found successfully",
      data: movies
    })
  } catch (err) {
    res.status(500).send({
      status: 'cannot get movie',
      msg: err
    })
  }
}

const addMovie = (req, res) => {
  let movie = new Movie(req.body)
  movie.save()
  .then( () => {
    checkVersion()
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
    checkVersion()
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
    checkVersion()
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

const checkVersion = async () => {
  try {
    const ver = await MovieVersion.find()
    if (ver.length > 0) {
      let movieVersion = await Movie.find()
      await Movie.update({ _id: movieVersion[0]._id }, {
        ver: movieVersion[0].ver+1
      })

    } else {
      let movieVersion = new MovieVersion({ver: 0})
      await movieVersion.save()
    }
  } catch (err) {
    console.log(err)
  }
}

const getVer = async (req, res) => {
  try {
    const version = await MovieVersion.find()
    res.send({
      status: 'OK',
      version: version[0].ver
    })
  } catch (err) {
    res.status(500).send({
      status: 'cannot get version',
      msg: err
    })
  }
}


module.exports = {
  getMovie,
  addMovie,
  editMovie,
  deleteMovie,
  getVer
};
