const axios = require('axios');

const movies = (cb) => {
  axios.get('http://localhost:3001/movie')
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
  movies
};
