const Movie = require('../model/movie')

const create = (req, res) => {
	Movie.create(req.body)
	.then( data => { 
		res.json(data)
	})
	.catch(err => {
		console.log(err)
	})
}

const list = (req, res) => {
	Movie.find()
	.then( movies => { res.json({info: 'movies found succesfully', data: movies}) })
}

module.exports = {
	list,
	create
}