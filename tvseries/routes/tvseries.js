const router = require('express').Router()
const tvseriesControllers = require('../controllers/tvseriesControllers')

router.get('/tv', tvseriesControllers.getAll)
router.post('/tv', tvseriesControllers.create)

module.exports = router;