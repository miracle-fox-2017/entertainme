const router = require('express').Router()
const tvseriesControllers = require('../controllers/tvseriesControllers')

router.get('/tvseries', tvseriesControllers.getAll)
router.post('/tvseries', tvseriesControllers.create)

module.exports = router;