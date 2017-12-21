const axios = require('axios')

const findAll = async (req,res) => {
	const getMovie =   await axios.get('http://localhost:3001/movie')
	const getSeries =  await axios.get('http://localhost:3002/tv')

	res.send({
		movies: getMovie.data,
		series: getSeries.data
	})
}	

module.exports = {
	findAll
}