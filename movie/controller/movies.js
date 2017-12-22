const Movie = require('../model/movies');
module.exports = {
  all: function(req, res) {
    Movie.find(function (err, movie) {
      if (err) {
        res.send(err)
      }

      res.json({
        movie
      })
    })
  },
  create: function(req, res) {
    Movie.create({
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
