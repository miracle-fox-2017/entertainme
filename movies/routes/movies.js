const router = require('express').Router()
const movieControllers = require('../controllers/movieControllers')

router.get('/movies', movieControllers.getAll)
router.post('/movies', movieControllers.create)

module.exports = router;