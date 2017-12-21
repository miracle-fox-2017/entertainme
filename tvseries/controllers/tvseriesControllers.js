const TvSeries = require('../models/tvseries')
// const Tag = require('../models/tag')
// const tagCreator = require('../helpers/tagCreator')

module.exports = {
  getAll (req, res) {
    TvSeries.find()
    .then(response => {
      res.send({
        info: 'tv series found successfully',
        data: response
      })
    })
    .catch(err => console.log(err))
  },

  create (req, res) {
    TvSeries.create(req.body)
    .then(response => {
      res.send({
        info: 'add new tv series successfully',
        data: response
      })
    })
    .catch(err => res.status(500).send(err))
  },

}