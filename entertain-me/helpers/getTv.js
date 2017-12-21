const axios = require('axios');

const tvs = (cb) => {
  axios.get('http://localhost:3002/tv')
  .then(({ data }) => {
    // console.log(data)
    cb(null, data)
  })
  .catch(err => {
    console.log(err)
    cb(err, null)
  })
}

module.exports = {
  tvs
};
