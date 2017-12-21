require('dotenv').config()
const mongoose = require('mongoose').connect(process.env.DB)

const movieSchema = mongoose.Schema({
  title: String,
  year: Number,
  overview: String,
  poster_path: String,
  popularity: Number,
  tag: [],
  status: String
})

const movieModel = mongoose.model('Movie', movieSchema)

module.exports = movieModel;
