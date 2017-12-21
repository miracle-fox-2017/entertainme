const app = require('express')(),
      Axios = require('axios'),
      redis = require("redis"),
      cache = redis.createClient(),
      responseTime = require('response-time')

cache.on('error', err => {
  console.log(`Error: ${err}`)
})
      
app.use(responseTime())
app.get('/entertainme', async (req, res) => {
  try {
    const movies = await Axios.get('http://localhost:3001/movie')
    const series = await Axios.get('http://localhost:3002/tv')
    cache.get('entertainme', function(err, data) {
      console.log(typeof data, 'INI ENTTERTAIN')
      if (data) {
          res.json(JSON.parse(data))
          console.log('LAMA')
      } else {
        const data = {
          movies: movies.data,
          series: series.data
        }
        cache.setex('entertainme', 20, JSON.stringify(data))
        console.log('BARU')
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