const mongoose = require('mongoose')
const Schema = mongoose.Schema

const series= new Schema({
  name: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  title:String,
  tag:String,
  status: String 
})


const seriesSchema = mongoose.model('seriesSchema', series)

module.exports = seriesSchema;