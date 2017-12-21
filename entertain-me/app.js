const app = require('express')()
const getMovie = require('./helpers/getMovie')
const getTv = require('./helpers/getTv')

app.get('/', (req, res) => {
  getMovie.movies((err, movies) => {
    getTv.tvs((err, tvs) => {
      res.json({
        status: 'OK',
        location: 'ENTERTAIN ME',
        movies: movies,
        tvs: tvs
      })
    })
  })
})

app.listen(3000)
