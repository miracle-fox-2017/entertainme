const app = require('express')()
const axios = require('axios')
const responseTime = require('response-time')
const redis = require('redis')
const client = redis.createClient()
var morgan = require('morgan')

client.on('error', err => {
  console.log(`Error: ${err}`)
})

app.use(responseTime())
app.use(morgan('dev'))


app.get('/', async (req, res) => {
  var getMovie = () => axios.get('http://localhost:3001/movie')
  var getSeries = () => axios.get('http://localhost:3002/series')
  var Movie = await getMovie()
  var Series = await getSeries()

  res.json({
    movie: {
      "info": "find successful",
      "data": Movie.data
    },
    Series: {
      "info": "find successful",
      "data": Series.data
    }
  })
})

//dengan redis
app.get('/redis', (req, res) => {
  client.get('datamovieseries', async(error, result) => {
    if(error) {
      console.log(error)
    } else if(result) {
      console.log('pakai chache')
      res.json(JSON.parse(result))
    }
    else {
      var movie = await axios.get('http://localhost:3001/movie')
      var series = await axios.get('http://localhost:3002/series')

      client.setex('datamovieseries', 10, JSON.stringify({
        movies: movie.data,
        series: series.data
      }))
      console.log('tidak pakai cache')
      res.send({
        movies: movie.data,
        series: series.data
      })
    }
  })
})

app.listen(3000)
