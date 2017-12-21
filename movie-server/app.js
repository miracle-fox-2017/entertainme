const app = require('express')()
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL
const url = 'mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/entertainme?ssl=true&replicaSet=smartshop-shard-0&authSource=admin';
let getAllBooks = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if(!err){
      console.log("Connected to get all books");
      // SHow document
      db.collection('books').find().toArray(function(err, dataBooks) {
        res.send(dataBooks)
      });
    }
  });
}
app.get('/api/movies', getAllBooks )

app.listen(3001, () => {
  console.log('Service Movie PORT 3001')
})