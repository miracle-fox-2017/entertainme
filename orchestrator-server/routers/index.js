const router = require('express').Router()
const OrchestratorCtrl = require('../controllers')

router.get('/movies', OrchestratorCtrl.getAllMovies)
router.get('/tvseries', OrchestratorCtrl.getAllTvSeries)
router.get('/entertainme', OrchestratorCtrl.getAllEntertainme)
router.post('/updateEntertainme', OrchestratorCtrl.addNewRedisData)

module.exports = router
