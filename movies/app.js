const express = require('express'),
  app = express(),
  MongoClient = require('mongodb').MongoClient,
  url = 'mongodb://amelia:amelia@cluster0-shard-00-00-71yp9.mongodb.net:27017,cluster0-shard-00-01-71yp9.mongodb.net:27017,cluster0-shard-00-02-71yp9.mongodb.net:27017/dbmicroservice?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

app.get('/api/movies', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if(err){
      console.log('not connected')
    } else{
      db.collection('movies').find().toArray(function(err, result){
        if(err){
          console.log(err)
        }else{
          res.json(result)
        }
      })
    }
  })
})

app.listen(3001)
