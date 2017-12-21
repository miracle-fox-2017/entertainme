const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const tvSchema = new Schema({
  name: String,
  overview: String,
  poster_path: String,
  popularity: String,
  tag: [
    {
      type: String
    }
  ]
})

const TV = mongoose.model('tvs', tvSchema)

module.exports = TV