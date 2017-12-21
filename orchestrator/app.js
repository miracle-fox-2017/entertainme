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

app.get('/entertainme/cache',(req,res) => {
  cache.on('error',err => {
    console.log(err);
  });
  cache.get('entertainment',async (err,data) => {
    const moviesVersion = await axios.get('http://localhost:3001/movie/ver');
    const seriesVersion = await axios.get('http://localhost:3002/tv/ver');
    const entertainment = JSON.parse(data);
    if(err){
      console.log(err);
      res.send('error');
    }else if(data == null || entertainment.moviesVersion !== moviesVersion.data.version || entertainment.seriesVersion !== seriesVersion.data.version){
      const getMovies = await axios.get('http://localhost:3001/movie');
      const getSeries = await axios.get('http://localhost:3002/tv');
      const dataJson = {
        movies : getMovies.data,
        series : getSeries.data,
        moviesVersion : moviesVersion.data.version,
        seriesVersion : seriesVersion.data.version
      }
      cache.set('entertainment',JSON.stringify(dataJson));
      res.json(dataJson);
    }else{
      cache.get('entertainment',(err,data) => {
        res.json(JSON.parse(data));
      });
    }
  });
});

app.listen(3000,() => {
  console.log('Server Orchestrator started!');
});
