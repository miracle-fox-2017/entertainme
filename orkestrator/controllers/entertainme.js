const axios = require('axios')
const redis = require("redis")
const client = redis.createClient()

const moviesReq = () => axios.get('http://localhost:3001/movies')
const tvReq = () => axios.get('http://localhost:3002/tv')

module.exports = {
  getAll (req, res) {
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
          client.setex('entertainme', 100, JSON.stringify(entertainData))
          res.json(entertainData)
        }
      })
    } catch (error) {
      res.send(err)
    }
  },
  getMovies (req, res) {
    try {
      client.get('movies', async (err, data) => {
        if(data) {
          res.json(JSON.parse(data))
        } else {
          let movies = await moviesReq()
          client.setex('movies', 100, JSON.stringify(movies.data))
          res.json(movies.data)
        }
      })
    } catch (error) {
      res.send(err)
    }
  },
  getTv (req, res) {
    try {
      client.get('tv', async (err, data) => {
        if(data) {
          res.json(JSON.parse(data))
        } else {
          let tv = await tvReq()
          client.setex('tv', 100, JSON.stringify(tv.data))
          res.json(tv.data)
        }
      })
    } catch (error) {
      res.send(err)
    }
  },
  updateCache (req, res) {
    let source = req.body.source
    let newData = JSON.parse(req.body.data)
    client.get('entertainme', (err, data) => {
      if(data) {
        let entertainData = JSON.parse(data)
        entertainData[source].data.push(newData)
        client.setex('entertainme', 100, JSON.stringify(entertainData))
      } else {
        console.log(err)
      }
    })
    client.get(source, (err, data) => { 
      if(data){
        let dataParse = JSON.parse(data)
        dataParse.data.push(newData)
        client.setex(source, 100, JSON.stringify(dataParse))
      }
    })
  }
}