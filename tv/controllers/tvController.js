const TV = require('../models/tvModel')
const axios = require('axios')
const redis = require('redis')
const client = redis.createClient()

const createSeries = (req, res) => {
  TV.create({
    name: req.body.name,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag
  })
    .then((dataSeries) => {
      fetchAPI(dataSeries)
      res.send(dataSeries)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const fetchAPI = (dataSeries) => {
  axios.get('http://localhost:3000/')
    .then((result) => {
      result.data.tvs.push(dataSeries)
      client.setex('alldata', 30, JSON.stringify(result.data))
    })
    .catch((reason) => {
      console.log(reason)
    })
}
const getDataSeries = (req, res) => {
  TV.find()
    .then((dataSeries) => {
      res.send(dataSeries)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const deleteDataSeries = (req, res) => {
  TV.findByIdAndRemove(req.params.id)
    .then((dataSeries) => {
      res.send(dataSeries)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

module.exports = {
  createSeries,
  getDataSeries,
  deleteDataSeries
}