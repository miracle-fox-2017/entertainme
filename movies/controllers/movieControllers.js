const Movie = require('../models/movie')
const Tag = require('../models/tag')
const axios = require('axios')
// const tagCreator = require('../helpers/tagCreator')

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
    .then(newMovie => {
      axios.post('http://localhost:3000/update/cache',{
        source: 'movies',
        data: JSON.stringify(newMovie)
      }).then(() => {
        console.log('cache updated')
      }).catch(err => {
        console.log(err)
      })
      res.send({
        info: 'add new movie successfully',
        data: newMovie
      })
    })
    .catch(err => res.status(500).send(err))
  },

}