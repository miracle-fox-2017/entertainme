const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tvSeriesSchema = new Schema({
  title: String,
  overview: String,
  popularity: String,
  status: String
})

module.exports = mongoose.model('TvSeries', tvSeriesSchema)
