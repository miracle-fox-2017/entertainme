const versionModel = require('../models/versionModel');
var axios = require('axios')
var redis = require("redis");
var client = redis.createClient();

function getCacheData(key = 'test') {
  return new Promise((resolve, reject) => {
    client.get(key, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  })
}

const createVersion = (req, res) => {
  versionModel.findOne({})
    .then(version => {
      if (version) {
        // Update
        version.version += 1

        version.save()
          .then(newVersion => {
            res.status(200).send({ status: newVersion, message: 'version Created' });

          }).catch(err => res.status(500).send({ message: 'Something wrong', error: err.message }));

      } else {
        let version = new versionModel({
          version: 0,
        })

        version.save()
          .then(newVersion => {
            res.status(200).send({ status: newVersion, message: 'version Created' });

          }).catch(err => res.status(500).send({ message: 'Something wrong', error: err.message }));
      }

    }).catch(err => res.status(500).send({ message: err.message }));
}

const findVersion = (req, res) => {
  versionModel.findOne({})
    .then(version => {
      if (version !== null) {
        res.status(200).send(version)
      } else {
        let version = new versionModel({
          version: 0,
        })

        version.save()
          .then(newVersion => {
            res.status(200).send(newVersion);

          }).catch(err => res.status(500).send({ message: 'Something wrong', error: err.message }));
      }

    }).catch(err => res.status(500).send({ message: err.message }));
}

const fetchEntertaintment = async (req, res) => {
  client.on("error", function (err) {
    console.log("Error " + err);
  });

  const getVersion = await axios.get('http://localhost:3000/version/')
  const getMovies = await axios.get('http://localhost:3001/movie/')
  const getTvSeries = await axios.get('http://localhost:3002/tv/')

  const getVersionCache = await getCacheData('version')
  const getMovieCache = await getCacheData('movies')
  const getTvCache = await getCacheData('tvSeries')

  console.log('---- API VERSION ', +getVersion.data.version)
  console.log('---- CACHE VERSION ', +getVersionCache)


  if (getVersionCache == null) {
    console.log('---- SET CACHE VERSION FROM API ', +getVersion.data.version)
    client.set('version', +getVersion.data.version)
  }

  if (getVersionCache < +getVersion.data.version) {
    client.del('movies')
    client.del('tvSeries')
    client.set('version', +getVersion.data.version)
  }

  if (getMovieCache == null) {
    console.log('---- SET CACHE MOVIE FROM API ')
    client.set('movies', JSON.stringify(getMovies.data.data))
  }

  if (getTvCache == null) {
    console.log('---- SET CACHE TV FROM API ')
    client.set('tvSeries', JSON.stringify(getTvSeries.data))
  }

  await res.send({
    movies: getMovieCache == null ? getMovies.data.data : JSON.parse(getMovieCache),
    series: getTvCache == null ? getTvSeries.data.data : JSON.parse(getTvCache)
  })
}

module.exports = {
  findVersion,
  createVersion,
  fetchEntertaintment
}