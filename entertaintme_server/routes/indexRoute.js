var express = require('express');
var router = express.Router();
var axios = require('axios')


/* GET home page. */
router.get('/', async (req, res) => {
  const getMovies = await axios.get('http://localhost:3001/movie/')
  const getTvSeries = await axios.get('http://localhost:3002/tv/')

  await res.send({
    movies: getMovies.data,
    series: getTvSeries.data
  })
});

module.exports = router;