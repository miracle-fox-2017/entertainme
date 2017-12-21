const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  title: String,
  overview: String,
  poster_path: String,
  popularity: Number,
  tag: []
})

const Movies = mongoose.model('Movies', movieSchema)

module.exports = Movies