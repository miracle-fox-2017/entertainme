var express = require('express');
var router = express.Router();
var axios = require('axios')
var redis = require("redis");
var client = redis.createClient();

function getCacheData(key = 'test') {
  return new Promise((resolve, reject) => {
    client.get(key, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  })
}

/* GET home page. */
router.get('/', async (req, res) => {
  client.on("error", function (err) {
    console.log("Error " + err);
  });

  const getMovies = await axios.get('http://localhost:3001/movie/')
  const getTvSeries = await axios.get('http://localhost:3002/tv/')
  
  const getMovieCache = await getCacheData('movies')  
  const getTvCache = await getCacheData('tvSeries')  
  
  if (getMovieCache == null) {
    console.log('---- SET CACHE MOVIE FROM API ')
    client.set('movies', JSON.stringify(getMovies.data.data))
  }

  if (getTvCache == null) {
    console.log('---- SET CACHE TV FROM API ')
    client.set('tvSeries', JSON.stringify(getTvSeries.data))
  }
  
  await res.send({
   /*  movies: getMovies.data,
    series: getMovies.data, */
    movies: getMovieCache == null ? getMovies.data.data : JSON.parse(getMovieCache),
    series: getTvCache == null ? getTvSeries.data.data : JSON.parse(getTvCache)
  })
});

module.exports = router;