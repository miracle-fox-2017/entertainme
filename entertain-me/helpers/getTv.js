const axios = require('axios');
const redis = require("redis");
const cache = redis.createClient();

cache.on("error", function (err) {
  console.log("Error " + err);
});

const tvs = (cb) => {
  cache.get('tv', (err, cacheData) => {
    if(cacheData) {
      let data = JSON.parse(cacheData)
      cb(null, data)
    } else {
      axios.get('http://localhost:3002/tv')
      .then(({ data }) => {
        cache.set('tv', JSON.stringify(data), 'EX', 5)
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
  tvs
};
