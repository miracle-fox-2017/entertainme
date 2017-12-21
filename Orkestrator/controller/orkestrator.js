const axios = require('axios')
const redis = require("redis")
const cache = redis.createClient();

const findAll =  (req,res) => {
	cache.get('entertain', async (err,data) => {
		if (err) console.log(err)
		const seriesVersion =  await axios.get('http://localhost:3002/tv/version')
		const moviesVersion =  await axios.get('http://localhost:3001/movie/version')	


		if(data === null || JSON.parse(data).seriesVersion !== seriesVersion.data.version || 
			JSON.parse(data).moviesVersion !== moviesVersion.data.version){
			console.log("masuk")
			const getMovie  =  await axios.get('http://localhost:3001/movie')
			const getSeries =  await axios.get('http://localhost:3002/tv')			
			cache.setex('entertain', 200, JSON.stringify({
				movies: getMovie.data,
				series: getSeries.data,
				seriesVersion: seriesVersion.data.version,
				moviesVersion: moviesVersion.data.version					
			}))		
			res.send({
				movies: getMovie.data,
				series: getSeries.data,
				seriesVersion: seriesVersion.data.version,
				moviesVersion: moviesVersion.data.version,					
			})			
		}else{
			res.send({data : JSON.parse(data), message : 'from redis'})
		}
	})

}	

module.exports = {
	findAll
}