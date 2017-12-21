const axios = require('axios')
const redis = require("redis")
const cache = redis.createClient();

const findAll =  (req,res) => {
	cache.get('entertain', async (err,data) => {
		if (err) console.log(err)
		if(data === null){
			const getMovie  =  await axios.get('http://localhost:3001/movie')
			const getSeries =  await axios.get('http://localhost:3002/tv')
			cache.setex('entertain', 200, JSON.stringify({
				movies: getMovie.data,
				series: getSeries.data					
			}))			
			res.send({
				movies: getMovie.data,
				series: getSeries.data
			})			
		}else{
			res.send(JSON.parse(data))
		}
	})

}	

module.exports = {
	findAll
}