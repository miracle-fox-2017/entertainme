const express = require('express')
const router = express.Router()
const tvSeriesCtrl = require('../controllers/tvSeriesController')

router.get('/', tvSeriesCtrl.getTV)
router.post('/', tvSeriesCtrl.postTV)

module.exports = router
