const mongoose = require('mongoose').connect('mongodb://localhost:27017/series');
const Schema = mongoose.Schema

const seriesSchema = new Schema({
 	poster_path: String,
    overview: String,
    title     : String,
    popularity: Number,
    tag: Array   
})

const seriesModel = mongoose.model('movie', seriesSchema);

module.exports = seriesModel