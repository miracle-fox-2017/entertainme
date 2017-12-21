require('dotenv').config()
const mongoose = require('mongoose').connect(process.env.DB)

const tvSchema = mongoose.Schema({
  title: String,
  year: Number,
  overview: String,
  poster_path: String,
  popularity: Number,
  tag: [],
  status: String
})

const tvModel = mongoose.model('Tv', tvSchema)

module.exports = tvModel;
