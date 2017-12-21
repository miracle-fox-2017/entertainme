const app = require('express')();
const axios = require('axios');
const redis = require('redis');
const responseTime = require('response-time');
const cache =  redis.createClient();

app.use(responseTime());

app.get('/entertainme/nocache',(req,res) => {
  axios.get('http://localhost:3001/movie').then(movie => {
    axios.get('http://localhost:3002/tv').then(tv => {
      res.json({
        movies :  movie.data,
        series : tv.data
      })
    });
  }).catch(err => {
    console.log(err);
  });
});

app.listen(3000,() => {
  console.log('Server Orchestrator started!');
});
