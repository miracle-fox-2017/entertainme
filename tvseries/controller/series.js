const Series = require('../model/series');
const redis = require('redis')
const client = redis.createClient()
const axios = require('axios')
client.on('error', err => {
  console.log(`Error: ${err}`)
})

module.exports = {
  all: function(req, res) {
    Series.find(function (err, series) {
      if (err) {
        res.send(err)
      }

      res.json({
        series
      })
    })
  },
  create: function(req, res) {
    Series.create({
      poster_path: req.body.poster_path,
      overview: req.body.overview,
      title: req.body.title,
      popularity: req.body.popularity
    }).then((hasil) => {
      axios.get('http://localhost:3000/').then(({data}) => {
        client.setex('datamovieseries', 10, JSON.stringify(data))
        res.send(hasil)
      })
    }).catch((err) => {
      res.send(err)
    })
  }
}
