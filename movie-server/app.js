const app = require('express')()
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL
const url = 'mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/entertainme?ssl=true&replicaSet=smartshop-shard-0&authSource=admin';

app.get('/movie', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if(!err){
      console.log("Connected to get all movies");
      // SHow document
      db.collection('movies')
        .find()
        .toArray(function(err, Movies) {
          res.json({
            info: 'movie found succesfully',
            data: Movies
          })
      });
    }
  });
})

app.listen(3001, (err) => {
  if(!err) {
    console.log('Service Movie PORT 3001')
  }
})