const app = require('express')();
const mongoose = require('mongoose');

mongoose.connect('mongodb://tomybudiman:400378@ecommerce-shard-00-00-l8lyw.mongodb.net:27017,ecommerce-shard-00-01-l8lyw.mongodb.net:27017,ecommerce-shard-00-02-l8lyw.mongodb.net:27017/movies?ssl=true&replicaSet=ecommerce-shard-0&authSource=admin');

const movies = require('./routes');
app.use('/movie',movies);

app.listen(3001,() => {
  console.log('Server Movies started!');
});
