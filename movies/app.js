const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://amelia:amelia@cluster0-shard-00-00-71yp9.mongodb.net:27017,cluster0-shard-00-01-71yp9.mongodb.net:27017,cluster0-shard-00-02-71yp9.mongodb.net:27017/dbmicroservice?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', (err) => {
  if (err) console.log('database not connected ', err)
  else console.log('database connected')
})

var movies = require('./routes/movies');
app.use('/api/movies', movies)

app.listen(3001)
