const TvSeries = require('../models/tvseries')
const axios = require('axios')
// const Tag = require('../models/tag')
// const tagCreator = require('../helpers/tagCreator')

module.exports = {
  getAll (req, res) {
    TvSeries.find()
    .then(tvseries => {
      res.json({
        info: 'tv series found successfully',
        data: tvseries
      })
    })
    .catch(err => console.log(err))
  },

  create (req, res) {
    TvSeries.create(req.body)
    .then(newTv => {
      axios.post('http://localhost:3000/update/cache',{
        source: 'tv',
        data: JSON.stringify(newTv)
      }).then(() => {
        console.log('cache updated')
      }).catch(err => {
        console.log(err)
      })
      res.send({
        info: 'add new tv series successfully',
        data: newTv
      })
    })
    .catch(err => res.status(500).send(err))
  },

}