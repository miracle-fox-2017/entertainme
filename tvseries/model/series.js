var mongoose = require('mongoose');
var Schema = mongoose.Schema
var seriesSchema = mongoose.Schema({
  poster_path: String,
  overview: String,
  title: String,
  popularity: Number,
  tag: Array
});

var Series = mongoose.model('Series', seriesSchema);

module.exports = Series
