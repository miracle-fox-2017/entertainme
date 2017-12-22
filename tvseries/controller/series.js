const Series = require('../model/series');
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
      res.send(hasil)
    }).catch((err) => {
      res.send(err)
    })
  }
}
