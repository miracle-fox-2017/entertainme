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

 /*  const getVersion = await axios.get('http://localhost:3000/version/')
  const getMovies = await axios.get('http://localhost:3001/movie/')
  const getTvSeries = await axios.get('http://localhost:3002/tv/') */

  const getVersion = await axios.get('http://localhost:3000/version/')
  const getVersionCache = await getCacheData('version')
  const getEntCache = await getCacheData('entData')
  
  client.set('version', getVersion.data.version)

  if (getVersionCache < +getVersion.data.version) {
    client.del('entData')
    client.set('version', +getVersion.data.version)
  }

  if (getEntCache === null) {
    console.log(`============FETCHING FROM API =====`)
    const getMovies = await axios.get('http://localhost:3001/movie/')
    const getTvSeries = await axios.get('http://localhost:3002/tv/')

    const apiData = {
      movies: getMovies.data.data,
      series: getTvSeries.data.data
    }

    client.set('entData', JSON.stringify(apiData))

    await res.send(apiData)

  } else {
    console.log(`--------------- FETCHING FROM CACHE =====`)
    await res.send(JSON.parse(getEntCache))
  }
}

module.exports = {
  findVersion,
  createVersion,
  fetchEntertaintment
}