const app = require('express')()
const axios = require('axios')
const redis = require('redis')
     
const Promise =require('bluebird')
Promise.promisifyAll(redis.RedisClient.prototype)
client = redis.createClient()

const getMovieData =() => axios.get('http://localhost:3001/movie')
const getSeriesData =() => axios.get('http://localhost:3002/tv')

const data = require ('./controllers/orchestra')

app.use('/movie',data.movieData)
app.use('/series',data.serieData)
app.use('/entertain',data.entertainment)

app.listen(3000,function(){
  console.log('Lari di 3000')
})