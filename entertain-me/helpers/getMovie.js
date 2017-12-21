const axios = require('axios');
const redis = require("redis");
const cache = redis.createClient();

cache.on("error", function (err) {
  console.log("Error " + err);
});

const movies = (cb) => {
  cache.get('movies', (err, cacheData) => {
    if(cacheData) {
      let data = JSON.parse(cacheData)
      cb(null, data)
    } else {
      axios.get('http://localhost:3001/movie')
      .then(({ data }) => {
        cache.set('movies', JSON.stringify(data))
        cb(null, data)
      })
      .catch(err => {
        console.log(err)
        cb(err, null)
      })
    }
  })
}

module.exports = {
  movies
};
