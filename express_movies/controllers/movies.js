const Movie = require('../model/movie')

const create = async (req, res) => {
	try{
		let data = await Movie.create(req.body)
		res.status(201).json(data)
	} catch(e){
		res.status(500).json(e)
	}
	
}

const list = async (req, res) => {
	try{
		let movies = await Movie.find()
		res.status(200).json({info: 'movies found succesfully', data: movies})
	} catch(e) {
		res.status(500).json(e)
	}
}

module.exports = {
	list,
	create
}