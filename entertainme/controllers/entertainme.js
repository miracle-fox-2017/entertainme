const axios = require('axios')

const listAll = async (req, res) => {
  let movie = await axios.get('http://localhost:3001/movies')
  let tv = await axios.get('http://localhost:3002/tv')
  
  let obj = {
    movies: movie.data,
    tvSeries: tv.data
  }

  res.json(obj)
}

module.exports = listAll