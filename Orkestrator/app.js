const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const axios = require('axios')
const redis = require("redis");
const client = redis.createClient();
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))

const getAllListMovie = (req, res) => {
    axios.get(`http://localhost:3001/api/movie`)
    .then(movie => {
        axios.get(`http://localhost:3002/api/tvseries`)
        .then(tvseries => {
            let listItem = {
                Movie: movie.data,
                Tvseries: tvseries.data
            }
            client.setex('allItem', 10, (JSON.stringify(listItem)))
            res.send(listItem)
        })
    })
};

const cek = (req, res, next) => {
    client.get('allItem', function (err, data) {
        if (err) throw err;
        if (data != null) {
            res.send(JSON.parse(data));
        } else {
            next();
        }
    });
}

app.get('/', cek, getAllListMovie)

app.listen('3000', () => {
  console.log('server 3000 jalan');
})
