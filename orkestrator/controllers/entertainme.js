const axios = require('axios')
const redis = require("redis")
const client = redis.createClient()

const moviesReq = () => axios.get('http://localhost:3001/movies')
const tvReq = () => axios.get('http://localhost:3002/tv')

module.exports = {
  getAll: async (req, res) => {
    try {
      client.get('entertainme', async (err, data) => {
        if(data) {
          let entertainData = JSON.parse(data)
          res.json({
            movies: entertainData.movies,
            tv: entertainData.tv
          })
        } else {
          let movies = await moviesReq()
          let tv = await tvReq()
          let entertainData = {
            movies: movies.data,
            tv: tv.data
          }
          client.setex('entertainme', 10, JSON.stringify(entertainData))
          res.json(entertainData)
        }
      })
    } catch (error) {
      res.send(err)
    }
  },
  getMovies: async (req, res) => {
    try {
      client.get('movies', async (err, data) => {
        if(data) {
          res.json(JSON.parse(data))
        } else {
          let movies = await moviesReq()
          client.setex('movies', 10, JSON.stringify(movies.data))
          res.json(movies.data)
        }
      })
    } catch (error) {
      res.send(err)
    }
  },
  getTv: async (req, res) => {
    try {
      client.get('tv', async (err, data) => {
        if(data) {
          res.json(JSON.parse(data))
        } else {
          let tv = await tvReq()
          client.setex('tv', 10, JSON.stringify(tv.data))
          res.json(tv.data)
        }
      })
    } catch (error) {
      res.send(err)
    }
  },
}