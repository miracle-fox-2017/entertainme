const Movie = require('../models/movie')

function create(req,res) {
	let movie = new Movie(req.body);
	movie.save((err, movie) => {
		if(err){
			res.status(500).send(err)
		}else{
			res.send(movie);
		}
	})
}

function findAll(req,res) {
	Movie.find().sort({ createdAt : 'desc' })
	.then(allMovie => {
		res.send(allMovie)
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

module.exports = {
	create,
	findAll,
}