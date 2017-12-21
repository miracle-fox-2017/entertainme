const express = require('express'),
  morgan = require('morgan'),
  axios = require('axios'),
  allData = require('./data/allData'),
  redis = require('redis'),
  client = redis.createClient(),
  app = express();

app.use(morgan('dev'))



app.get('/', (req, res) => {
  client.get('alldata', async function (err, reply) {
    if (err) {
      console.log(err)
    } else if (reply) {
      res.json(JSON.parse(reply))
    } else {
      const movies = await axios.get('http://localhost:3001/api/movies')
      const tvs = await axios.get('http://localhost:3002/api/tv')
      client.setex('alldata', 10, JSON.stringify({
        movies: movies.data,
        tvs: tvs.data
      }))
      res.json({
        movies: movies.data,
        tvs: tvs.data
      })
    }
  })
})


app.listen(3000)
