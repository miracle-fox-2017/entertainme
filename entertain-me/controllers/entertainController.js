// const getMovie = require('../helpers/getMovie')
// const getTv = require('../helpers/getTv')
const redis = require("redis");
const cache = redis.createClient();
const axios = require('axios')
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

cache.on("error", function (err) {
  console.log("Error " + err);
});

const entertain = (req, res) => {
  const getEntertain = async () => {
    try {
      //check version Movies
      // const cacheMovVersion = await cache.multi().get('movieVersion').execAsync()
      // const movieVersion = await axios.get('http://localhost:3001/movie/ver')
      // cache.set('movieVersion', movieVersion.data.version, 'EX', 5)
      // console.log(cacheMovVersion[0])
      // console.log(movieVersion.data.version)
      // if(cacheMovVersion[0].version && cacheMovVersion[0].version === movieVersion.data.version) {
      //   //return cache -json parse
      //   const movieRaw = await cache.multi().get('movies').execAsync()
      //   const movies = JSON.parse(movieRaw)
      // } else {
      //   //return axios
      //   console.log('here')
      //   const movieRaw = await axios.get('http://localhost:3001/movie')
      //   const movies = movieRaw.data
      //   cache.set('movies', JSON.stringify(movies.data), 'EX', 5)
      // }

      //check version TV
      // const cacheTvVersion = await cache.multi().get('tvVersion').execAsync()
      // const tvVersion = await axios.get('http://localhost:3002/tv/ver')
      // if(cacheTvVersion[0] == tvVersion.data.version) {
      //   //return cache -json parse
      //   const tvRaw = await cache.multi().get('tv').execAsync()
      //   const tvs = JSON.parse(tvRaw)
      // } else {
      //   //return axios
      //   const tvRaw = await axios.get('http://localhost:3002/tv')
      //   const tvs = tvRaw.data
      //   cache.set('tv', JSON.stringify(tvs.data), 'EX', 5)
      // }

      // res.json({
      //   status: 'OK',
      //   location: 'ENTERTAIN ME',
      //   movies: movies
      // })

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
