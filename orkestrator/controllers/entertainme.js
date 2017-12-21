const axios = require('axios')

module.exports = {
  getAll: async (req, res) => {
    try {
      const movies = await axios.get('http://localhost:3001/movies')
      const tv = await axios.get('http://localhost:3002/tv')
      
      res.send({
        movies: movies.data,
        tv: tv.data
      })
    } catch (error) {
      res.send(err)
    }
  }
}