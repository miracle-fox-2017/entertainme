const express = require('express');
const router = express.Router();
const tv = require('../controllers/tvController')

router.get('/', tv.getDataSeries)
router.post('/', tv.createSeries)

module.exports = router
