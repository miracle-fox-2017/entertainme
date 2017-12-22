const app = require('express')()

const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL
const url = 'mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/entertainme?ssl=true&replicaSet=smartshop-shard-0&authSource=admin';
let version = Math.random()
app.get('/tv/version', (req, res) => {
  console.log('cekVersion')
  res.json({version:version})
})
app.get('/tv', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if(!err){
      console.log("Connected to get all Tv Series");
      // SHow document
      db.collection('tvseries')
        .find()
        .toArray(function(err, Series) {
          res.json({
            data:{
              info: 'tv found succesfully',
              data: Series
            },
            version: version
          })
      });
    }
  });
})

app.listen(3002, () => {
  console.log('Service TV series PORT 3002')
})