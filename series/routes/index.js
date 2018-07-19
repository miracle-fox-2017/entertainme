const router = require('express').Router();
const seriesController = require('../controllers/controller-series');

router.get('/',seriesController.allSeries);
router.get('/ver',seriesController.version);

module.exports = router;
