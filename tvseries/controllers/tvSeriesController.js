const TV = require('../models/tvSeriesModel')
const mongoose = require('mongoose')


const getTV = (req,res) => {
  TV.find({})
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const postTV = (req,res) => {
  TV.create({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag,
    status: req.body.status
  })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  getTV,
  postTV
}
