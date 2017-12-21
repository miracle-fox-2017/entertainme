const Movie = require('../models/model-movies');

module.exports = {
  allMovies : (req,res) => {
    Movie.find().then(response => {
      res.json({
        info : "movies found successfully",
        data : response
      })
    }).catch(err => {
      res.json({
        info : "movies cannot be found",
        data : response
      })
    });
  }
};
