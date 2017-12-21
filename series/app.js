const app = require('express')();
const mongoose = require('mongoose');

mongoose.connect('mongodb://tomybudiman:400378@ecommerce-shard-00-00-l8lyw.mongodb.net:27017,ecommerce-shard-00-01-l8lyw.mongodb.net:27017,ecommerce-shard-00-02-l8lyw.mongodb.net:27017/series?ssl=true&replicaSet=ecommerce-shard-0&authSource=admin');

const series = require('./routes');
app.use('/tv',series);

app.listen(3002,() => {
  console.log('Server Series started!');
});
