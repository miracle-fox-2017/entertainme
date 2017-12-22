const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
	poster_path: String,
	overview:  String,
	title:   String,
	popularity: Number,
	tagList: [{
		type: String,
	}]
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;