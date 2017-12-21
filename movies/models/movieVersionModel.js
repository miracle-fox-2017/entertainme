const mongoose = require('mongoose')

const movieVersionSchema = mongoose.Schema({
  ver: Number
})

const movieVersionModel = mongoose.model('MovieVersion', movieVersionSchema)

module.exports = movieVersionModel;
