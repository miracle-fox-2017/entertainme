const axios = require('axios')
const redis = require('redis')
const bluebird = require('bluebird')
const client = redis.createClient()
bluebird.promisifyAll(redis.RedisClient.prototype);
client.on("connect", () => {
  console.log("Connected to Redis ")
})

const listAll = async (req, res) => {
  try{
    let getAll = await client.get('coba')
    let movie = await axios.get('http://localhost:3001/movies')
    let tv = await axios.get('http://localhost:3002/tv')
  
    let listData = {
      movies: movie.data,
      tvSeries: tv.data
    }
    client.get('coba', (err, reply) => {
      if(reply) {
        let entertainme = JSON.parse(reply)
  
        res.status(200).json({
          movies: entertainme.movies,
          tvSeries: entertainme.tvSeries
        })
      }
      else {
        client.setex('coba', 20, JSON.stringify(listData))
        res.status(200).json(listData)
      }
    })
  } catch(e) {
    res.status(500).json(e)
  }
}

const listUncache = async (req, res) => {
  try {
    let movie = await axios.get('http://localhost:3001/movies')
    let tv = await axios.get('http://localhost:3002/tv')

    let listData = {
      movies: movie.data,
      tvSeries: tv.data
    }
    res.status(200).json(listData)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports = { 
  listAll,
  listUncache
}