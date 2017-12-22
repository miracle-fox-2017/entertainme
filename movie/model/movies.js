var mongoose = require('mongoose');
var Schema = mongoose.Schema
var movieSchema = mongoose.Schema({
  poster_path: String,
  overview: String,
  title: String,
  popularity: Number,
  tag: Array
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie
