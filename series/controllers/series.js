const Seri = require('../models/series')
const axios = require('axios')
const redis = require('redis')
const client = redis.createClient()

const getAllSeries = (req, res) => {
  Seri.find()
  .then(series => {
    res.status(200).send({
      status: "OK",
      series
    })
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const getAPISeries = (req, res) => {
  axios.get('http://localhost:3000/orchestra')
  .then(data => {
    client.setex('entertain', 30, JSON.stringify(data))
  })
}

const postSeri = (req, res) => {
  let seri = new Seri ({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    status: req.body.status,
    popularity: req.body.popularity,
    tag: req.body.tag
  })
  seri.save()
  .then(newSeri => {
    res.status(200).send({
      status: "New Seri",
      newSeri
    })
    getAPISeries()
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const updateSerie = (req, res) => {
  Seri.findByIdAndUpdate(req.params.id, {
    $set:{
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      status: req.body.status,
      popularity: req.body.popularity,
      tag: req.body.tag
    }
  }, {new: true})
  .then(newSeri => {
    res.status(200).send({
      status: 'updated',
      newSeri
    })
    getAPISeries()
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const removeSerie = (req, res) => {
  Seri.findByIdAndRemove(req.params.id)
  .then(remove => {
    res.status(200).send({
      status: "Remove",
      remove
    })
    getAPISeries()
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  getAllSeries,
  postSeri,
  updateSerie,
  removeSerie
};