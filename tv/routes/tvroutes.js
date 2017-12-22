const series = require('../controllers/tvController')
const express = require('express')
const router = express.Router()

router.get('/',series.findSer)

router.post('/',series.postSer)

module.exports = router;