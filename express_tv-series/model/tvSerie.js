const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tvSchema = Schema({
  title: String,
  overview: String,
  poster_path: String,
  popularity: Number,
  status: String,
  tag: []
})

const tvSeries = mongoose.model('tvSeries', tvSchema)

module.exports = tvSeries
