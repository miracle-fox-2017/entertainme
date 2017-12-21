const Movie = require('../models/movie')
const Tag = require('../models/tag')
const tagCreator = require('../helpers/tagCreator')

module.exports = {
  getAll (req, res) {
    Movie.find()
    .then(response => {
      res.json({
        info: 'movies found successfully',
        data: response
      })
    })
    .catch(err => console.log(err))
  },

  create (req, res) {
    Movie.create(req.body)
    .then(response => {
      res.send({
        info: 'add new movie successfully',
        data: response
      })
    })
    .catch(err => res.status(500).send(err))
  },

}