const mongoose = require('mongoose')

const tvVersionSchema = mongoose.Schema({
  ver: Number
})

const tvVersionModel = mongoose.model('TvVersion', tvVersionSchema)

module.exports = tvVersionModel;
