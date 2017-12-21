const Movie = require('../models/movie')
const Version = require('../models/version')

function create(req,res) {
	Version.findOne()
	.then(v => {
		if(v === null){
			let version = new Version({
				name: 'movie',
				version: 0
			})
			version.save()
		}else{
			let movie = new Movie(req.body);
			movie.save((err, movie) => {
				if(err){
					res.status(500).send(err)
				}else{
					res.send(movie);
				}
			})
		}
	})
	.catch(err => {
		console.log(err)
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

function update(req,res) {
	Movie.findOne({
		_id : req.params.movieId
	})
	.then(movie => {
		movie.set({ 
			poster_path: req.body.poster_path || movie.poster_path,
			overview: req.body.overview || movie.overview,
			title: req.body.title || movie.title,
			popularity: req.body.popularity || movie.popularity,
			tag: req.body.tag || movie.tag,
		})
		movie.save((err, result) => {
			if(err) res.status(500).send(err)
			Version.findOne({
				name: 'movie'
			})
			  .then(ver => {
			  	ver.set({
			  		version: ver.version+1
			  	})
			  	ver.save()
			  	res.send(result)
			  })
			  .catch(err => {
			  	res.status(500).send(err)
			  })
		})
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function getVersion(req,res) {
	Version.findOne({
		name: 'movie'
	})
	  .then(result => {
	  	res.send(result)
	  })
	  .catch(err => {
	  	res.status(500).send(err)
	  })
}

module.exports = {
	create,
	findAll,
	getVersion,
	update
}