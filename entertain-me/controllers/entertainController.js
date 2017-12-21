// const getMovie = require('../helpers/getMovie')
// const getTv = require('../helpers/getTv')
const redis = require("redis");
const cache = redis.createClient();
const axios = require('axios')

cache.on("error", function (err) {
  console.log("Error " + err);
});

const entertain = (req, res) => {
  const getEntertain = () => {
    try {
      cache.get('movies', (errMovie, cacheMovie) => {
        cache.get('tv', async (errTv, cacheTv) => {
          if(cacheTv && cacheMovie) {
            let dataMovie = JSON.parse(cacheMovie)
            let dataTv = JSON.parse(cacheTv)
            res.json({
              status: 'OK',
              location: 'ENTERTAIN ME',
              movies: dataMovie,
              tvs: dataTv
            })
          } else {
            const movies = await axios.get('http://localhost:3001/movie')
            const tvs = await axios.get('http://localhost:3002/tv')
            cache.set('movies', JSON.stringify(movies.data), 'EX', 5)
            cache.set('tv', JSON.stringify(tvs.data), 'EX', 5)
            res.json({
              status: 'OK',
              location: 'ENTERTAIN ME',
              movies: movies.data,
              tvs: tvs.data
            })
          }
        })
      })
    } catch (err) {
      res.status(500).send({
        err: 'cannot get API',
        msg: err
      })
    }
  }
  getEntertain()
}

module.exports = {
  entertain
};
