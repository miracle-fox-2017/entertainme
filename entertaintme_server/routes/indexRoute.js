var express = require('express');
var router = express.Router();
var axios = require('axios')
var redis = require("redis");
var client = redis.createClient();
var entertaintmentController = require('../controllers/entertainmentController')

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

/* GET home page. */
router.get('/entertainme', entertaintmentController.fetchEntertaintment);
router.get('/version', entertaintmentController.findVersion);
router.post('/version', entertaintmentController.createVersion);


module.exports = router;