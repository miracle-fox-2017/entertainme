const getMovie = require('../helpers/getMovie')
const getTv = require('../helpers/getTv')

const entertain = (req, res) => {
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
}

module.exports = {
  entertain
};
