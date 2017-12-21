const Movie = require('../models/model-movies');
const Version = require('../models/model-version');

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
  },
  version : (req,res) => {
    Version.findOne().then(response => {
      res.json(response);
    }).catch(err => {
      res.send(err)
    });
  }
};
