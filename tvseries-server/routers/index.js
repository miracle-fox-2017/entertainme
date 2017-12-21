const router = require('express').Router()
const TvSeriesCtrl = require('../controllers')

router.get('/', TvSeriesCtrl.getAllTvSeries)
router.get('/seed', TvSeriesCtrl.seedTvSeries)
router.post('/addnewdata', TvSeriesCtrl.addNewTvSeries)

module.exports = router
