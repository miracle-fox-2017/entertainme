const app =require('express')()
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/tvseries')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const indexTv = require('./routes/tvroutes')

app.use('/tv',indexTv)

app.listen(3002, function(){
  console.log('Ayo lari di 3002')
})