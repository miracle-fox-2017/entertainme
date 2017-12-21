const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seriesSchema = Schema ({
  title: String,
  overview: String,
  poster_path: String,
  status: String,
  popularity: Number,
  tag: [],
})

const Seri = mongoose.model('Series', seriesSchema)

module.exports = Seri;