var express = require('express');
var router = express.Router();
const controllerTv = require('../controllers/tvSeries') 

/* GET users listing. */
router.get('/', controllerTv.list)
router.post('/', controllerTv.create)

module.exports = router;
