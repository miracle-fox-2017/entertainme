const axios = require('axios')

const getMovies = () => {
  axios.get('http://localhost:3001/api/movies')
}

const getTvs = () => {
  axios.get('http://localhost:3002/api/tv')
}

module.exports = {
  getMovies,
  getTvs
}