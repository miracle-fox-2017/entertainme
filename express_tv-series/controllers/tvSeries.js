const tvSeries = require('../model/tvSerie')

const create = (req, res) => {
  tvSeries.create(req.body)
  .then(data => { res.json(data) })
  .catch(err => { res.json(data) })
}

const list = (req, res) => {
  tvSeries.find()
  .then(data => { res.json({info: 'tv found successfully', data: data}) })
  .catch(err => { res.json(data) })
}


module.exports = {
  create,
  list
}