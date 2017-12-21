const Seri = require('../models/series')

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
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  getAllSeries,
  postSeri
};