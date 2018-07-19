const app = require('express')(),
      Axios = require('axios'),
      redis = require("redis"),
      cache = redis.createClient(),
      responseTime = require('response-time')

cache.on('error', err => {
  console.log(`Error: ${err}`)
})

app.use(responseTime())
app.get('/entertainme', (req, res) => {
  try {
    cache.get('entertainme', async (err, data) => {
      if (data) {
        const moviesVersion = await Axios.get('http://localhost:3001/movie/version')
        const seriesVersion = await Axios.get('http://localhost:3002/tv/version')
        let parsing = JSON.parse(data)
        if(parsing.movies.version !== moviesVersion.data.version) {
          const movies = await Axios.get('http://localhost:3001/movie')
          parsing.movies = movies.data
        }
        if(parsing.series.version !== seriesVersion.data.version) {
          const series = await Axios.get('http://localhost:3002/tv')
          parsing.series = series.data
        }
        console.log(moviesVersion.data.version, seriesVersion.data.version)
        res.json(parsing)
      } else {
        const movies = await Axios.get('http://localhost:3001/movie')
        const series = await Axios.get('http://localhost:3002/tv')
        console.log(movies.data.version)
        const data = {
          movies: movies.data,
          series: series.data
        }
        cache.setex('entertainme', 20, JSON.stringify(data))
        res.json(data)
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.listen(3000, (err) =>{
  if(!err) {
    console.log('Main server running on PORT 3000')
  }
})