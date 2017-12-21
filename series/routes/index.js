const router = require('express').Router();
const seriesController = require('../controllers/controller-series');

router.get('/',seriesController.allSeries);

module.exports = router;
