const express = require('express');
const router = express.Router();
var seriesController = require('../controller/series');

router.get('/', seriesController.all)
router.post('/', seriesController.create)

module.exports = router
