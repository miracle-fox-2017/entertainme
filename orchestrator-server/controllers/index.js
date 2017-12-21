const axios   = require('axios')
const redis   = require('redis')
const Promise = require('bluebird')
Promise.promisifyAll(redis.RedisClient.prototype)
client  = redis.createClient()

class Orchestrator {

  //without redis
  // static async getAllMovies (req, res) {
  //   try {
  //     const allMovies = await axios.get('http://localhost:3001/movies')
  //     console.log(allMovies)
  //     res.status(200).send(allMovies.data)
  //   } catch (e) {
  //     res.status(500).send(e)
  //   }
  // }

  //with redist
  static async getAllMovies (req, res) {
    try {
      const redisMovie = await client.getAsync('movies')
      if (!redisMovie) {
        const allMovies = await axios.get('http://localhost:3001/movies')
        client.setAsync('movies', JSON.stringify(allMovies.data), 'EX', 10)
        res.status(200).send(allMovies.data)
      } else {
        res.status(200).send(JSON.parse(redisMovie))
      }
    } catch (e) {
      res.status(500).send(e)
    }
  }

  static async getAllTvSeries (req, res) {
    try {
      const allTvSeries = await axios.get('http://localhost:3002/tvseries')
      res.status(200).send(allTvSeries.data)
    } catch (e) {
      res.status(500).send(e)
    }
  }

  static async getAllEntertainme (req, res) {
    try {
      const redisEntertainme = await client.getAsync('entertainme')

      if (!redisEntertainme) {
        const allMovies   = await axios.get('http://localhost:3001/movies')
        const allTvSeries = await axios.get('http://localhost:3002/tvseries')
        const MoviesData  = allMovies.data
        const TvData      = allTvSeries.data
        client.setAsync('entertainme', JSON.stringify({MoviesData, TvData}), 'EX', 30)
        res.status(200).send({MoviesData, TvData})
      } else {
        res.status(200).send(JSON.parse(redisEntertainme))
      }
    } catch (e) {
      res.status(500).send(err)
    }
  }

  static async addNewRedisData (req, res) {
    console.log(req.body)
    try {
      const redisEntertainme = await client.getAsync('entertainme')
      if (redisEntertainme) {
        let tempRadis = JSON.parse(redisEntertainme)
        if (req.body.type === 'tv') {
          tempRadis.TvData.push(req.body.newData)
        }

        if (req.body.type === 'movies') {
          tempRadis.MoviesData.push(req.body.newData)
        }

        client.setAsync('entertainme', JSON.stringify(tempRadis), 'EX', 30)
      }
      res.status(200).send('sukses tong')
    } catch (e) {
      res.status(500).send(e)
    }
  }

}

module.exports = Orchestrator
