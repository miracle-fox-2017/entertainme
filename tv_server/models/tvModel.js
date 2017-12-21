const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tvSchema = new Schema({
	poster_path: String,
	overview:  String,
	title:   String,
	popularity: Number,
	tagList: [{
		type: String,
	}]
});

const TVModel = mongoose.model('Tv', tvSchema);

module.exports = TVModel;